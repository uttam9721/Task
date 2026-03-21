import React,{useState,useEffect} from 'react'

const Product = () => {
    const [data,setData]=useState([])
    const [currentPage,setCurrentPage]=useState(1);
    const pageCount=6;



    const fetchData=async()=>{
        const data=await fetch('https://dummyjson.com/products')
        const res=await data.json()
        console.log(res.products);
        setData(res.products)
    }
    useEffect(()=>{
        fetchData();
    },[])


    const deleteItem=(index)=>{
        const deleteCart=data.filter((_,i)=>i!==index)
        setData(deleteCart)
    }


    const lastIndex=currentPage*pageCount;
    const firstIndex=lastIndex-pageCount;

    const product=data.slice(firstIndex,lastIndex);
    const len=Math.ceil(data.length/pageCount);
  return (
    <>
      <div className='grid grid-cols-3 ml-10'>
        {product.map((item,idx)=>{
            return(
                <div className='mx-auto mt-10'>

                <div key={idx} className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 '>
                    
                        <div className='w-80 border border-[#ccc] gap-2'>
                            <div className='flex'>

                        <h3 className='w-70 text-center font-bold mt-4'>{item.description.slice(1,60)}</h3>
                        <p 
                        onClick={()=>deleteItem(idx)}
                        className='text-xl font-bold cursor-pointer text-red-600'>X</p>
                            </div>
                        <img className='w-70  mx-auto'  src={item.images} alt="" />
                        </div>
                </div>
                
                </div>
            )
        })}
      </div>
       <div className='justify-center text-center h-22 mt-10 '>
                        <button 
                        disabled={currentPage===1}
                        onClick={()=>setCurrentPage(currentPage-1)}>Prev</button>
                        {currentPage} of {len}
                        <button
                        disabled={currentPage===len}
                        onClick={()=>setCurrentPage(currentPage+1)}>Next</button>
                    </div>
    </>
  )
}

export default Product
