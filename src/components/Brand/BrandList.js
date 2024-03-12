import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrand, getBrand } from '../../redux/features/CategoryAndBrand/CategoryAndBrandSlice';
import Loader from '../loader/Loader';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { FaTrashAlt } from 'react-icons/fa';

const BrandList = () => {
    const { isLoading, brands } = useSelector((state) => state.category);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getBrand());
    }, [dispatch]);
    const confirmDelete = (slog) => {
      confirmAlert({
        title: 'Delete Brand ',
        message: 'Are you sure to delete this Brand.',
        buttons: [
          {
            label: 'Delete',
            onClick: () => delBrand(slog)
          },
          {
            label: 'Cancel',
           
          }
        ]
      });
    };
  
    const delBrand =async(slog) =>{
      await dispatch(deleteBrand(slog))
      await dispatch(getBrand());
    }
    return (
      <>
        {isLoading && <Loader />}
        <div className='--mb2'>
          <h3>All Brands</h3>
          <div className='table'>
            {Array.isArray(brands) && brands.length === 0 ? (
              <p>No brand</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {brands?.map((brand, index) => {
                    const { _id, name, slog ,category} = brand;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{name}</td>
                        <td>{category}</td>
                        <td>
                          <span>
                            <FaTrashAlt onClick={()=>confirmDelete(slog)} size={20} color={'red'} />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </>
    );
}

export default BrandList