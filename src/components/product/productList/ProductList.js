import React, { useEffect, useState } from 'react'
import styles from "./ProductList.module.scss"
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from '../../search/Search';
import ProductItem from '../productItem/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { FILTER_BY_SEARCH, SORT_PRODUCTS, selectFliteredProducts } from '../../../redux/features/product/filterSlice';
import { GET_ALL_RANGE } from '../../../redux/features/product/ProductSlice';
const ProductList = ({products}) => {
    const {minPrice,maxPrice} = useSelector((state)=>state.product);
  const [grid,setGrid] = useState(true);
  const [search,setSearch] = useState("")
  const [sort,setSort] = useState("latest")
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFliteredProducts);
 
  useEffect(()=>{
    dispatch(FILTER_BY_SEARCH({products,search}));
  },[dispatch,products,search])
  useEffect(()=>{
    dispatch(SORT_PRODUCTS({products,sort}));
  },[dispatch,products,sort])

  //begin paginate
  const itemsPerPage = 9;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    
    setItemOffset(newOffset);
  };
  //End Pagiate
  return (
    <div className={styles["product-list"]}>
        <div className={styles.top}>
            <div className={styles.icons}>
               <BsFillGridFill 
                 size={22}
                 color="orangered"
                 onClick={()=>setGrid(true)}
               />
               <FaListAlt
                 size={24}
                 color="#0066d4"
                 onClick={()=>setGrid(false)}
                />
                <p>
                    <b>{currentItems.length} products found</b>
                </p>
            </div>
            <div>
               <Search value={search} onChange={(e)=>setSearch(e.target.value)}/>
            </div>
            <div className={styles.sort}>
               <label>Sort by :</label>
               <select value={sort} onChange={(e)=>setSort(e.target.value)}>
                <option value="latest">Latest</option>
                <option value="lowest-price">Lowest-Price</option>
                <option value="highest-price">Highest-Price</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
               </select>
            </div>
        </div>
        <div className={grid ? `${styles.grid}`:`${styles.list}`}>
            {products.length === 0 ?(
                <p>No product found .</p>
            ):(
                <>
                {currentItems.map((product)=>{
                    return(
                        <div key={product._id}>
                            <ProductItem {...product} grid={grid} product={product}/>
                        </div>
                    )
                })}
                </>
            )
            }
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
  )
}

export default ProductList