import React from 'react'
import Layout from '../components/Layout/Layout'
import image from "../assests/aboutUs.avif"

const About = () => {
  return (
    <Layout title={"About-Ecommerce app"}>
      <div className='about-container'>
        <div >
          <img src={image} alt='about-image' />
        </div>
        <div className='about-content'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim nisl at quam malesuada semper. Curabitur sit amet viverra sapien, fermentum viverra est. Pellentesque vel semper nulla, ut sollicitudin massa. Donec aliquam ultrices dictum. In gravida velit a nulla cursus cursus. Nunc hendrerit libero eget purus commodo egestas. Sed vehicula orci a varius dignissim. Cras eu tempus tortor, sit amet semper arcu. Duis eu neque sapien. Nulla a rhoncus nulla. Morbi finibus nunc a nibh cursus feugiat. Cras accumsan arcu sit amet ante scelerisque congue. Aliquam viverra leo a ultricies laoreet.
            <br />
            Sed vitae nulla neque. Vestibulum nec dolor at arcu imperdiet tristique. Etiam bibendum id orci sit amet fermentum. In a libero ac mauris tempor eleifend. Nunc id ullamcorper lectus. Proin luctus molestie ligula vehicula porta. Etiam pharetra commodo massa, non rutrum lorem pretium eget. Aliquam suscipit elit leo, non sagittis lectus aliquet vel. Sed sem tellus, imperdiet eu dui at, maximus placerat mauris. Nulla suscipit et ipsum vitae dignissim. Sed sed fermentum dolor, a condimentum tellus. Phasellus eget dui id sapien aliquet viverra.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About
