const axios = require('axios')
const _ = require('underscore')
const uniswapsdk = require('@uniswap/sdk')
// import { ChainId, Token, WETH, Pair, TokenAmount } from '@uniswap/sdk'

//读取最近1000条交易的数据
var PAIRlIST =[]
var toaddress='0x320e11d95b1f4acc0f6e097b915f2fbfcbd491e8'

axios.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2', {
  query: `
  {
    swaps(first: 1000,where: { ,
                              to:"${toaddress}" 
                           }
       orderBy: timestamp, orderDirection: desc) {
           transaction {
             id
             timestamp
           }
           id
           pair {
             token0 {
               id
               symbol
             }
             token1 {
               id
               symbol
             }
           }
           amount0In
           amount0Out
           amount1In
           amount1Out
           amountUSD
           to
         }
  }  
  `
})
.then((res) => {
    // console.log(res.data)
  for (const item of res.data.data.swaps) {
    // console.log(item)
    
    var result = _.find(PAIRlIST,(iteminfo)=>{
      if(iteminfo.pair.token0 == item.pair.token0&&
        iteminfo.pair.token1 == item.pair.token1){
          return true;
        }
    })
    // console.log('--',result)
      if(result==undefined){
        PAIRlIST.push(item)
      }
  }
  // console.log(PAIRlIST)
  PAIRlIST.forEach(async (item)=>{
    // console.log(item.pair.token0,item.pair.token1)
   var token0 = new uniswapsdk.Token(
      1,
      item.pair.token0.id,
      18,
      item.pair.token0.symbol
    )
  // const TokenA = new Token(coinA.chainId, coinA.address, coinA.decimals, coinA.symbol);
  var token1 = new uniswapsdk.Token(
    1,
    item.pair.token1.id,
    18,
    item.pair.token1.symbol
  )
    console.log(token0,token1)
    var pairAddress = uniswapsdk.Pair.getAddress(token0,token1)
    console.log('pairAddress',pairAddress.toLowerCase())
    var data = await getpair(pairAddress.toLowerCase())
    console.log('交易对信息',data.data)

  })

})
.catch((error) => {
  console.error(error)
})

getpairSwap('0xb43542e6b7c209f7da4b579792f67a1844546ce8',toaddress)

function getpair(pairaddress){
  return  axios.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2', {
   query: `
   {
     pair(id:"${pairaddress}") {
       id
       token0 {
         id
         symbol
       }
       token1 {
         id
         symbol
       }
       reserveUSD
       volumeUSD
       totalSupply
       token0Price
       token1Price
     }
   }
     
   `
 })
 
 
 }

function getpairSwap(pairaddress,toaddress){
  axios.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2', {
  query: `
  {
    swaps(first: 1000,where: { pair_in: ["${pairaddress}"],
                              to:"${toaddress}" 
                           }
       orderBy: timestamp, orderDirection: desc) {
           transaction {
             id
             timestamp
           }
           id
           pair {
             token0 {
               id
               symbol
             }
             token1 {
               id
               symbol
             }
           }
           amount0In
           amount0Out
           amount1In
           amount1Out
           amountUSD
           to
         }
  }  
  `
  })
  .then((data)=>{
    console.log('一个交易对的用户历史记录')
    // console.log(data.data.data)
    data.data.data.swaps.forEach((one)=>{
      console.log(one)
    })
  })

}



return ;
//读取一个账户在一个交易对下 数据

axios.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2', {
  query: `
  {
    pairs(first: 20,orderBy:volumeUSD,orderDirection:desc) {
        id,
        token0 {
          id,
          symbol
        },
        token1 {
          id,
          symbol
        },
        volumeUSD,
        txCount
      }
   }  
  `
})
.then((res) => {
    // console.log(res.data)
  for (const item of res.data.data.pairs) {
    console.log(item,item.pair.token0.id,item.pair.token1.id)
    // PAIRlIST
    // var pairAddress = uniswapsdk.Pair.getAddress(item.pair.token0.id,item.pair.token1.id)
    // console.log('pairAddress',pairAddress)
  }
})
.catch((error) => {
  console.error(error)
})


return ;








axios.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2', {
  query: `
  {
    swaps(first: 20,where: { pair_in: ["0xd058416f4c83a4f187631c454f872b076c0a7642"],
                            to:"0xe02cb67D8fBb5E3E975C05c3419b3846ebac5c3F" 
                         }
     orderBy: timestamp, orderDirection: desc) {
         transaction {
           id
           timestamp
         }
         id
         pair {
           token0 {
             id
             symbol
           }
           token1 {
             id
             symbol
           }
         }
         amount0In
         amount0Out
         amount1In
         amount1Out
         amountUSD
         to
       }
   }  
  `
})
.then((res) => {
    console.log(res.data)
  for (const item of res.data.data.swaps) {
    console.log(item)
  }
})
.catch((error) => {
  console.error(error)
})




/*
swaps(first: 30, where: { pair_in: $allPairs }, orderBy: timestamp, orderDirection: desc) {
      transaction {
        id
        timestamp
      }
      id
      pair {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      amount0In
      amount0Out
      amount1In
      amount1Out
      amountUSD
      to
    }

*/

/*
let result = await client.query({
      query: FILTERED_TRANSACTIONS,
      variables: {
        allPairs: [pairAddress],
      },
      fetchPolicy: 'no-cache',
    })
*/