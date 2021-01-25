const React = require('react')
const Layout = require('./src/components/layout.js').default

exports.wrapPageElement = ({element,props})=>{
return<Layout{...props}>{element}</Layout>
}