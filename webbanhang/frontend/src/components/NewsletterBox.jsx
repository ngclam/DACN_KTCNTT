import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (e) => {
        e.preventDefault();
    }

  return (
    <div className=' text-center'>
      <p className=' text-2xl font-medium text-gray-800'>Đăng ký ngay và nhận khuyến mãi 20%</p>
      <p className=' text-gray-400 mt-3'>
      Khi bạn đăng ký, bạn sẽ được cập nhật thông tin về các chương trình giảm giá, bộ sưu tập mới nhất và các sự kiện độc quyền chỉ dành cho thành viên. Đây là cách tuyệt vời để bạn trở thành người đầu tiên biết đến những món đồ hot và không bỏ lỡ cơ hội sở hữu sản phẩm yêu thích với giá ưu đãi.      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input className=' w-full sm:flex-1 outline-none' type="email" placeholder='Nhập email để đăng ký nhận voucher' required/>
        <button type='submit' className=' bg-black text-white text-xs px-10 py-4'>Đăng ký</button>
      </form>
    </div>
  )
}

export default NewsletterBox
