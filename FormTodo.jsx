import React, { useEffect, useState } from 'react'

export default function FormTodo() {

    const [formData,setformData]=useState({
        name:'',
        email:'',
        password:'',
        phone:'',
        gender:'',
        checkbox:false,
        Selection:''
    })
  
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [savedData,setSavedData]=useState([])
    const [editData,seteditData]=useState(null)
    

    const [currentPage,setcurrentPage] = useState(1)

const itemsPerPage = 3

    function hadlechange(e){

        const {name,value,type,checked}=e.target
        setformData({
            ...formData,[name]:type=== "checkbox" ? checked : value
        })

       
    }

    function handlesubmit(e){

        e.preventDefault()

        let updatedData;

        if(editData !=null){
            updatedData=[...savedData]
            updatedData[editData]=formData
            seteditData(null)
        }

        else{
            updatedData=[...savedData,formData]
        }

        setSavedData(updatedData)

        localStorage.setItem("data",JSON.stringify(updatedData))

        setformData({
            name:'',
            email:'',
            password:'',
            phone:'',
            gender:'',
            checkbox:false,
            Selection:''
            
        })

        alert("Form Submmited")
    }

    useEffect(()=>{
        const localdata=JSON.parse(localStorage.getItem("data")) || []
        setSavedData(localdata)
    },[])

 

    function Delete(id) {

    const ans = savedData.filter((el, i) => {
        return i !== id
    })

    setSavedData(ans)

    localStorage.setItem("data", JSON.stringify(ans))
}

function Edit(id){
    setformData(savedData[id])
    seteditData(id)
}

const lastIndex = currentPage * itemsPerPage
const firstIndex = lastIndex - itemsPerPage

const filteredData = savedData.filter((item) =>
  item.name.toLowerCase().includes(search.toLowerCase())
);

const sortedData = [...filteredData].sort((a, b) => {
  if (sort === "az") {
    return a.name.localeCompare(b.name);
  }
  if (sort === "za") {
    return b.name.localeCompare(a.name);
  }
  return 0;
});

const currentData = sortedData.slice(firstIndex, lastIndex);

const totalPages = Math.ceil(sortedData.length / itemsPerPage);


  return (
    <div className='container mt-5'>
      <div card p-4 shadow>

        <h2 className='text-center p-4'>Registration Form</h2>
        <form onSubmit={handlesubmit}>
            <div className='mb-3'>
                <label>Name</label>
                <input type="text" name="name" className='form-control' value={formData.name} onChange={hadlechange} required />
            </div>

            <div className='mb-3'>
                <label>Email</label>
                <input type="email" name="email" className='form-control' value={formData.email} onChange={hadlechange} required />
            </div>

            <div className='mb-3'>
                <label>Password</label>
                <input type="password" name="password" className='form-control' value={formData.password} onChange={hadlechange} required />
            </div>

            <div className='mb-3'>
                <label>Phone No</label>
                <input type="tel" name="phone" className='form-control' value={formData.phone} onChange={hadlechange} required />
            </div>

            <div className='mb-3'>
                <label className='me-3'>Gender:</label>
                <input type="radio" name='gender' value='male' checked={formData.gender==='male'} onChange={hadlechange}  required/>
                <label className='me-3 ms-1' >Male</label>
                <input type="radio" name='gender' value='female' checked={formData.gender==='female'} onChange={hadlechange}/>
                <label className='ms-1'>Female</label>
            </div>

            <div className='mb-3'>
                <input type="checkbox" name='checkbox' checked={formData.checkbox} onChange={hadlechange} required />
                <label className='ms-2'>Accept Terms & Conditions</label>
            </div>

            <div>
                <label className='mb-3'>Select Course</label>

                <select 
                name="Selection"
                className='form-select'
                value={formData.Selection}
                onChange={hadlechange}
                required >

                    <option value=""></option>
                    <option value="Web Devlopment">Web Devlopment</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="CyberSecurity">CyberSecurity</option>
                </select>
            </div>

                <button type='submit' className='btn btn-primary w-25 mt-5 mb-5'>Submit</button>
        </form>
            <div className="mb-3">
  <input
    type="text"
    className="form-control"
    placeholder="Search by name..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>
<select
  className="form-select mb-3"
  value={sort}
  onChange={(e) => setSort(e.target.value)}
>
  <option value="">Sort By</option>
  <option value="az">A-Z</option>
  <option value="za">Z-A</option>
</select>
        <div className="table-responsive mt-4">
  <table className="table table-bordered table-striped table-hover shadow">
    <thead className="table-dark">
      <tr className="text-center">
        <th>Name</th>
        <th>Password</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Gender</th>
        <th>Course</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {currentData.map((el, i) => (
        <tr key={i} className="text-center align-middle">
          <td>{el.name}</td>
          <td>{el.password}</td>
          <td>{el.email}</td>
          <td>{el.phone}</td>
          <td>{el.gender}</td>
          <td>{el.Selection}</td>

          <td>
            <div className="d-flex justify-content-center gap-2">
              <button
                type="button"
                className="btn btn-warning btn-sm"
                onClick={() => Edit(i)}
              >
                Edit
              </button>

              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => Delete(i)}
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      </div>

      <div className='mt-4 d-flex justify-content-center align-items-center gap-3'>

    <button
        className='btn btn-secondary'
        disabled={currentPage === 1}
        onClick={() => setcurrentPage(currentPage - 1)}
    >
        Prev
    </button>

    <span>
        Page {currentPage} of {totalPages}
    </span>

    <button
        className='btn btn-secondary'
        disabled={currentPage === totalPages}
        onClick={() => setcurrentPage(currentPage + 1)}
    >
        Next
    </button>

</div>
    </div>
  )
}