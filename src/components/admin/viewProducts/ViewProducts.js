import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../../redux/features/auth/authSlice'
import { deleteProduct, getProduct } from '../../../redux/features/product/ProductSlice'
import Search from '../../search/Search'
import "./ViewProducts.scss"
import { Spinner } from '../../loader/Loader'
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from 'react-router-dom'
import { shortenText } from '../../../utlis'
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const ViewProducts = () => {
  const dispatch = useDispatch()
  const [search,setSearch] = useState("");
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const {products,isLoading} = useSelector((state)=>state.product);
  
  useEffect(()=>{
     if(isLoggedIn){
        dispatch(getProduct());
     }
  },[dispatch,isLoggedIn])
  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete Product ',
      message: 'Are you sure to delete this Product.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => deleteProducts(id)
        },
        {
          label: 'Cancel',
         
        }
      ]
    });
  };
  const deleteProducts = async(id) =>{
    await dispatch(deleteProduct(id));
    await dispatch(getProduct());
  }
  const EditProduct = (id) =>{
    dispatch()
  }

  //begin paginate
  const itemsPerPage = 6;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    
    setItemOffset(newOffset);
  };
  //End Pagiate
  return (
    <section>
        <div className="container product-list">
            <div className='table'>
                <div className='--flex-between --flex-dir-column'>
                    <span>
                        <h3>All Products</h3>
                    <p>
                        ~<b>{products.length}</b>Products found
                    </p>
                    </span>
                    <span>
                        <Search value={search} onChange={(e)=>setSearch(e.target.value)}/>
                    </span>
                </div>
            </div>
            {isLoading && <Spinner/>}
            <div className='table'>
                {!isLoading && products.length === 0 ? (
                    <p>--No Products Found...</p>
                ):(
                   <table>
                    <thead>
                        <tr>
                            <td>s/n</td>
                            <td>Name</td>
                            <td>Category</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Value</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((product,index)=>{
                            const {_id,name,category,price,quantity} = product;
                            return(
                                <tr key={_id}>
                                    <td>{index+1}</td>
                                    <td>{shortenText(name,16)}</td>
                                    <td>{category}</td>
                                    <td>{"$"}{price}</td>
                                    <td>{quantity}</td>
                                    <td>{"$"}{price*quantity}</td>
                                    <td className='icons'>
                                        <span>
                                            <Link to="/admin/all-products">
                                               <AiOutlineEye size={25} color={"purple"} />
                                            </Link>
                                        </span>
                                        <span>
                                        <Link to={`/admin/edit-product/${_id}`}>
                                           <FaEdit size={25} color={"green"} />
                                        </Link>
                                        </span>
                                        <span>
                                        <Link to="/admin/all-products">
                                           <FaTrashAlt size={20} color={"red"} onClick={()=>confirmDelete(_id)}/>
                                        </Link>
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                   </table>
                )}
            </div>
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName='page-num'
        previousLinkClassName='page-num'
        nextLinkClassName='page-num'
        activeLinkClassName='activePage'
      />
        </div>
    </section>
  )
}

export default ViewProducts