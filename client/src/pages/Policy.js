import React from 'react'
import Layout from '../components/Layout/Layout'
import policy from "../assests/policy.jpg"

const Policy = () => {
  return (
    <Layout title={"Policy-Ecommerce app"}>
      <div className='policy-container'>
        <div>
          <img src={policy} alt='policy-img' />
        </div>
        <div className='policy-contents'>
          <ul>
            <li>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
            </li>
            <li>
              met, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure repre
            </li>
            <li>
              cur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying conse
            </li>
            <li>
              mos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default Policy
