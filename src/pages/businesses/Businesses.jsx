import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../components/table/Table'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import customerList from "../../assests/JsonData/customers-list.json";
import { deleteBusiness, getBusinesses } from '../../store/actions/businessActions';
import "./business.css"
import Loader from '../../components/loader/Loader';
import { useNavigate } from 'react-router-dom';


const customerTableHead = [
  'Owener Name',
  'Business Name',
  'Mobile Number',
  'Type',
  'Category',
  'Address',
  'Email',
  '',
  '',
]

const renderHead = (item, index) => <th key={index}>{item}</th>


const Businesses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const businesses = useSelector(state => state.businesses);
  const { businessData, loading: businessLoading, success } = businesses;

  const deleteBusinessState = useSelector(state => state.deleteBusiness);
  const { loading: deletebusinessLoading, success: deletebusinessSuccess } = deleteBusinessState;

  useEffect(() => {

    dispatch(getBusinesses());

  }, [dispatch, deletebusinessSuccess])


  const editHandler = (id) => {
    alert(id)
  }
  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure!\nEither OK or Cancel.")) {
      dispatch(deleteBusiness(id));
    }
  }

  const renderBody = (item, index) => {
    return <tr key={index}>
      <td>{item.ownerName}</td>
      <td>{item.name}</td>
      <td>{item.mobileNumber}</td>
      <td>{item.type}</td>
      <td>{item.category}</td>
      <td>{item.address}</td>
      <td>{item.email}</td>
      <td id="edit-business" onClick={() => editHandler(item._id)}><EditIcon /></td>
      <td id="delete-business" onClick={() => deleteHandler(item._id)}><DeleteIcon style={{ color: "red" }} /></td>
    </tr>
  }

  const addBussinessHandler = () => {
    navigate("/khata/businesses/add-business")
  }

  return (
    <div>
      {businessLoading && <Loader />}
      {deletebusinessLoading && <Loader />}
      <h2 className="page-header">
        Businesses
      </h2>
      <div className="row">
        <div onClick={addBussinessHandler} className="status-card add-bussiness-btn" style={{ margin: "32px auto", marginTop: "0px" }}>
          <div className="status-card__icon">
            <i className="abs"></i>
          </div>
          <div className="status-card__info">
            <h4>ADD</h4>
            <span>Bussiness</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              {success && <Table
                limit='10'
                headData={customerTableHead}
                renderHead={renderHead}
                bodyData={businessData}
                renderBody={renderBody}
              />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Businesses
