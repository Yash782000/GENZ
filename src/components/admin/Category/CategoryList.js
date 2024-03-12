import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getCategory} from '../../../redux/features/CategoryAndBrand/CategoryAndBrandSlice';
import { FaTrashAlt } from 'react-icons/fa';
import Loader from '../../loader/Loader';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const CategoryList = () => {
  const { isLoading, categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  const confirmDelete = (slog) => {
    confirmAlert({
      title: 'Delete Category ',
      message: 'Are you sure to delete this category.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => deleteCat(slog)
        },
        {
          label: 'Cancel',
         
        }
      ]
    });
  };

  const deleteCat =async(slog) =>{
     await dispatch(deleteCategory(slog));
     await dispatch(getCategory());
  }
  return (
    <>
      {isLoading && <Loader />}
      <div className='--mb2'>
        <h3>All Categories</h3>
        <div className='table'>
          {Array.isArray(categories) && categories.length === 0 ? (
            <p>No Category</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((cat, index) => {
                  const { _id, name, slog } = cat;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
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
};

export default CategoryList;
