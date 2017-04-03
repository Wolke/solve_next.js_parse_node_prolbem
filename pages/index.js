import React from 'react'
import Link from 'next/link'
import Parse from 'parse'
import 'isomorphic-fetch'

export default class MyPage extends React.Component {
  static async getInitialProps(req) {
    const res = await fetch('http://localhost:3000/api')
    const json = await res.json()
    return {
      users: json.users
    }
  }

  componentDidMount() {

Parse.serverURL = "http://localhost/parse";
Parse.initialize("hell", "hellJAVASCRIPT_KEY");
    let q = new Parse.Query(Parse.User);
    q.count(c => {
      console.log(c)
    })
  }

  render() {
    return <h1>{this.props.users}</h1>
  }
}