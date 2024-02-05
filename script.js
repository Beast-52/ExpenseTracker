
  let state = {
    expense: 0,
    earning: 0,
    net: 0,
    transactions: [],
};

const balance = document.querySelector(".balance h2");
const credit = document.querySelector(".credit span");
const debit = document.querySelector(".debit span");
const tbody = document.querySelector("tbody");
const form = document.querySelector('form');
let tid;
let isUpdate = false;

const saveData = () => {
    let string = JSON.stringify(state);
    localStorage.setItem("newState", string);
};

const getData = () => {
    let retString = localStorage.getItem("newState");
    if (retString !== null) {
        let retArray = JSON.parse(retString);
        state = retArray;
    }
};
getData();

const updateTransaction = () => {
  

  state.earning = 0
  state.expense = 0  
  
  tbody.innerHTML = ''
 
  state.transactions.forEach((item) => {
    
    
    let { title, Amount, isCredit,id  } = item;
    
    isCredit = isCredit === "credit" ? true : false;
   
    
    let clutterBox = `
        <tr>
        <td>${title}</td>
        <td>${Amount}$</td>
        <td>${isCredit ? 'Earning':'Expense'}</td>
        <td class="edbtn">
            <button onclick="handleDelete(${id})"  class="red">Delete</button>
            <button onclick="handleUpdate(${id})"   class="green">Edit</button>  
        </td>
    </tr>
        `;

    tbody.innerHTML += clutterBox;
    state.earning += isCredit ? Amount :0
    state.expense += !isCredit ? -Amount : 0
  
  });  
  
  let {net,earning,expense}= state
    
    net = earning + expense
    state.net = net
    credit.textContent = earning + '$'
    debit.textContent = -expense  + '$'
    balance.textContent = net + '$'  
    saveData()
  
};


const addTransaction = (e)=>{

    e.preventDefault()
    
    let formData = new FormData(form)

    const tdata = {}

    formData.forEach((value,key)=>{
      tdata[key] = value
    })

    let {title,amount} = tdata

    let newTransaction ={
      id:isUpdate?tid:Date.now(),
      title: title,
      Amount: amount > 0 ? +amount : -amount,
      isCredit : amount > 0 ? 'credit'  : 'debit',
      
    }
    if(isUpdate){
      let tIndex = state.transactions.findIndex((t)=>t.id===tid)
      state.transactions[tIndex]  = newTransaction
      isUpdate = false
      tid = null
    }
    else{
      state.transactions.push(newTransaction)
    }
    document.querySelector('#title').value = ''
    document.querySelector('#amount').value = ''
    
   
      tbody.innerHTML = ''
      updateTransaction()
    saveData()
    

   
  }
  const handleUpdate = (id)=>{
    let newTransaction = state.transactions.find((t)=>t.id===id)
    let {title,Amount} = newTransaction
    document.querySelector('#title').value = title
    document.querySelector('#amount').value = Amount
    tid = id
    document.querySelector('#title').focus()
    isUpdate= true
  }
  const handleDelete = (id)=>{
    let newTransaction = state.transactions.filter((t) => t.id != id);
    state.transactions = [...newTransaction]
    updateTransaction()
    saveData()

  }
  form.addEventListener('submit',addTransaction)
  updateTransaction();

