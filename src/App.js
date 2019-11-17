
import React, { Component } from 'react'
import './App.css'
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails'
import {recipes} from './tempList'

export default class App extends Component {
  state={
    recipes:recipes,
    url:"https://www.food2fork.com/api/search?key=5d29b243270eda16f2a50184b84e4fc9",
    base_url:"https://www.food2fork.com/api/search?key=5d29b243270eda16f2a50184b84e4fc9",
    detail_id: 35374,
    pageIndex:1,
    search:'',
    query:"&q=",
    error:''
  }
async getRecipes(){
    try{
      const data= await fetch(this.state.url);
      const jsonData=await data.json();
      if(jsonData.recipes.length===0){
        this.setState( ()=> 
        {  return  {error:"sorry but your search didn't return any result"}
           
          }
        )
      } else{
      this.setState(
        {
          recipes:jsonData.recipes
        }
      )
    }
    }
    catch(error){
      console.log(error);
    }
  }
  componentDidMount(){
    this.getRecipes()
  }
  
 displayPage=index=>{
   switch(index){
     case 1:  
       return <RecipeList recipes={this.state.recipes} handleDetails={this.handleDetails} value={this.state.search} 
       handleChange={this.handleChange} handleSubmit={this.handleSubmit} error={this.state.error}/>;
       case 0: 
       return <RecipeDetails id={this.state.detail_id} handleIndex={this.handleIndex}/>;
   }
 }
 handleIndex=index=>{
   this.setState({
     pageIndex:index
   });
 }
 handleDetails=(index,id)=>{
  this.setState({
    pageIndex:index,
    detail_id: id
  });
}
handleChange=e=>{
  this.setState(
    {
      search: e.target.value
    }
  )
}
handleSubmit=(e)=>{
  e.preventDefault();
  const {base_url,query,search}=this.state;
  this.setState(
    ()=>{
      return {url:`${base_url}${query}${search}`,search:""}
      
    },()=>this.getRecipes()
  )
}

  render() {
    return (
      <React.Fragment>
       {this.displayPage(this.state.pageIndex)}
        
      </React.Fragment>
    )
  }
}

