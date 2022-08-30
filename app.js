const form=document.querySelector('#searchForm');
const res=document.querySelector('#tableResult');
var upd;
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(upd){
        clearTimeout(upd);
    }
    const ctype= form.elements.coinType.value;    
    fetchPrice(ctype);
})
const fetchPrice= async(ctype)=>{
    const r=await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=INR`);
    console.log(r.data.coin.price);
    const price=r.data.coin.price;
    const volume=r.data.coin.volume;
    const base= r.data.coin.name;
    const change=r.data.coin.priceChange1d;
    const target= 'INR';
    
    res.innerHTML = `<tr style="background-color:green; color:white; font-weight:700">
        <td>
            Property
        </td>
        <td>Value</td>
        </tr>
        <tr style="background-color:darkgoldenrod; color:white; font-weight:600">
            <td>
                ${base}
            </td>
            <td>${price} ${target}</td>
        </tr>
        <tr style="background-color:purple; color:white; font-weight:600">
            <td>
                volume
            </td>
            <td>${volume}</td>
        </tr>
        <tr style="background-color:teal; color:white; font-weight:600">
            <td>
               change 
            </td>
            <td>${change}</td>
        </tr>`
        upd=setTimeout(()=>fetchPrice(ctype),10000);

}