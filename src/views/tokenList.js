import {DEFAULT_LIST_OF_LISTS} from '@/com/tokeninfo.js'
import axios from 'axios'
import { Contract, Provider } from 'ethers-multicall';
import { ethers } from 'ethers';

import erc20Abi from '@/com/erc20ABI.json';


const provider =  new ethers.providers.JsonRpcProvider('https://eth-mainnet.alchemyapi.io/v2/zyCVxF_4dpNdoIk_xOJ5yiD5By6_yU3X');;

export async function getlist () {
  var url = DEFAULT_LIST_OF_LISTS[0]
  console.log(url)
  var data = await axios.get(url)
  console.log(data)
  data.data
  return data.data
}
