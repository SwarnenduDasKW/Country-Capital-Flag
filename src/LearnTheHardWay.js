import React,{useEffect,useState} from 'react'

function LearnTheHardWay() {
    const [something,setSomething] = useState("");
    const [anArray,setanArray] = useState([{
        company: "Twitter Inc",
        ticker: "TWTR",
        stockPrice: "22.76 USD",
        timeElapsed: "5 sec ago",
      },
      {
        company: "Square Inc",
        ticker: "SQ",
        stockPrice: "45.28 USD",
        timeElapsed: "10 sec ago",
      }]);

    const [stocks, setstocks] = useState([]);

    useEffect(() => {      
        console.log("I am in useEffect");
        setSomething("Hello!!");
        getStocks();
        console.log(something);
    }, [])

    const getStocks = () => {
        setstocks( [{
            company: "Facebook Inc",
            ticker: "TWTR",
            stockPrice: "22.76 USD",
            timeElapsed: "5 sec ago",
          },
          {
            company: "CGI Inc",
            ticker: "SQ",
            stockPrice: "45.28 USD",
            timeElapsed: "10 sec ago",
          }]);
    };
    
    return (
        <div>
         <p>This is {something}</p>
         <p>{anArray.map(x => (<li>{x.company}</li>))}</p>
         <p>{stocks.map(x => (<li>{x.company}</li>))}</p>
        </div>
    )
}

export default LearnTheHardWay
