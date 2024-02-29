import React from 'react'
import Layout from '../components/Layout/Layout'
import image1 from '../assests/contact.webp'
import { MdOutlineAttachEmail } from "react-icons/md";
import { TbPhoneCall } from "react-icons/tb";
import { TfiHeadphoneAlt } from "react-icons/tfi";


const Contact = () => {
  return (
    <Layout title={"Contact-Ecommerce app"}>
      <div className='row g-0 '>
        <div className='col-md-6'>
          <img src={image1} alt='contact-vector' />
        </div>
        <div className='details col-md-4'>
          <h1 className='contact-heading'>CONTACT US</h1>
          <p>any qurey and info about product feel free to call anytime we 24X7 available</p>
          <p><MdOutlineAttachEmail />: www.help@ecommerceapp.com </p>
          <p><TbPhoneCall />: 012-3456789</p>
          <p><TfiHeadphoneAlt />: 1800-0000-0000</p>
        </div>
      </div>

    </Layout>
  )
}

export default Contact
