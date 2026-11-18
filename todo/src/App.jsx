import { useState , useEffect} from "react";
import { CirclePlus, X , Check , ClipboardList } from "lucide-react";
import "./App.css";





function App(){
  const[tarefa,setTarefa]=useState("");
const[resultado,setResultado]=useState(()=>{
  const tarefaSalva = localStorage.getItem("tarefas");
  return tarefaSalva
      ? JSON.parse(tarefaSalva)
      :[];
});

useEffect(()=> {
  localStorage.setItem(
    "tarefas",
    JSON.stringify(resultado)
  );
},[resultado]);


  function addTarefa(){
    //verificar se esta a tarefa esta vazia 
    
    
    if(tarefa.trim() === ""){
      return;
    }
    
    const existe= resultado.some((item)=>
    item.nome.toLowerCase().trim() === tarefa.trim().toLocaleLowerCase()
  );
  if(existe){
    alert ("escreva um item diferente");
    return;
  }

    
    //criar um objeto id e nome
    const novaTarefa={
      id:Date.now(),
      nome:tarefa,
      concluida:false
    };

    


    //pegar o valor e colocar no resultado
    setResultado([... resultado, novaTarefa])
 setTarefa("");
  };


  function excluirTarefa(id){
    setResultado(
      resultado.filter((item)=>item.id !== id)
    )};

    function ConcluirTarefa(id){
    setResultado(

      resultado.map((item)=> 
        item.id === id 
      ? {... item, concluida: !item.concluida}
      : item
    )
    )
  };

const totalTarefas=resultado.length;
const totalConcluidas=resultado.filter((item)=>item.concluida === true).length;
  


return(


 
  <div className="principal"> 
    <h1>Lista de compras</h1>
    <form onSubmit={(e)=>{
      e.preventDefault();
      addTarefa();
    }}>
    <label htmlFor="tarefa" className="iconeTarefa"><ClipboardList /></label>
    <input type="text"
     required
     value={tarefa}
     placeholder="digite uma tarefa"id="tarefa"className="tarefa"
     onChange={(e)=>setTarefa(e.target.value)}/>

     <button type="submit" className="add"><CirclePlus/></button>
     </form>
     <div className="total">
      <h2 className="titulototal">Total de Itens</h2>
      {totalTarefas}
      </div>
      <div className="totalConcluidas">
      <h2 className="concluidas">Total de Itens comprados</h2>
      {totalConcluidas}
     </div>
     
     <div className="resultado">

      {resultado.map((item)=>(
        <div key={item.id} className="itens">
        <button className="excluir" onClick={() => excluirTarefa(item.id)}>< X /></button>
        <button className="check" onClick={() => ConcluirTarefa(item.id)}><Check /></button>
        <span className="tarefaConcluida" style={{
          textDecoration: item.concluida
          ? "line-through"
          : "none"
        }}
        >
         {item.nome}
        </span>
        
        </div>
        
      ))}


     </div>
  
  
  </div>
)}

export default App;
