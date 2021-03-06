import { Container, Button } from 'react-bootstrap'
import { useState } from 'react'
import './HomePageItem.css'

const HomePageItem = (props) => {
  const [id, setId] = useState(props.id)
  

  //call purchase-item endpoint
  const completeOrder = () => {
    fetch(`/purchase-item?id=${id}`, {
      withcredentials: true,
      headers: {'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`}
    })
    .then(res => res.json())
    .then(resText => {alert(resText.msg); document.location.reload(false)})
    .catch(err => {console.log(err)})
}

  //call cancel-order endpoint
  const cancelOrder = () => {
    fetch(`/cancel-order?id=${id}`, {
      withcredentials: true,
      headers: {'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`}
    })
    .then(res => res.json())
    .then(resText => {alert(resText.msg); document.location.reload(false)})
    .catch(err => {console.log(err)})
  }

  return (

    <Container id='hp-item-container'>
        <div id='hp-item-title'>{props.title}</div>
        <div>{props.poster}</div>
        <Button className='hpItem-button' onClick={completeOrder}>complete order</Button>
        <Button className='hpItem-button' onClick={cancelOrder}>cancel order</Button>

    </Container>

  )
}

export default HomePageItem