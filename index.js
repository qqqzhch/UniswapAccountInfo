const axios = require('axios')

//读取最近1000条交易的数据

axios.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2', {
  query: `
  {
    swaps(first: 1000,where: { ,
                              to:"0x18a3f419ec2cf69cae910d2694ba1bd720dd2a2f" 
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
    console.log(res.data)
  for (const item of res.data.data.pairs) {
    console.log(item)
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