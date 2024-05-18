var works = true
mm = document.getElementById("metamask")
var tokens
const web3 = new Web3(window.ethereum);
console.log(web3)

const contractAddress = "0x042CEFC274383950e7CCF8F541E54B5257967eBd"

const contractAbi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_smb",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_is",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_mtb",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "_ble",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "_sle",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "_ht",
				"type": "bool"
			}
		],
		"name": "mintToken",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract MyToken",
				"name": "which",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			}
		],
		"name": "stakeInAnother",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "contract MyToken",
				"name": "which",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "stakingId",
				"type": "uint256"
			}
		],
		"name": "unstakeInAnother",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract MyToken",
				"name": "which",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "viewMyStakingInOneContract",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "nameOf",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "idOf",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timeat",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "completed",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "addr",
						"type": "address"
					}
				],
				"internalType": "struct MyToken.staking",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wu",
				"type": "address"
			}
		],
		"name": "viewMyTokensAdresses",
		"outputs": [
			{
				"internalType": "contract MyToken[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract MyToken",
				"name": "which",
				"type": "address"
			}
		],
		"name": "viewMyTokensDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "symbol",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "supply",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "mintable",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "burnable",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "stakeable",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "ht",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					}
				],
				"internalType": "struct MyToken.details",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
var tknAbi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_s",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_is",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_mtb",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "_ble",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "_sle",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "_ht",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_NAME",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_APY",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_FHL",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_LIMIT",
				"type": "uint256"
			}
		],
		"name": "addStakingPool",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "who",
				"type": "address"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "deletePool",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "who",
				"type": "address"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pools",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "APY",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "limit",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "exists",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "stakedInHere",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amountToStk",
				"type": "uint256"
			}
		],
		"name": "stake",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "unstake",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "mintable",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "burnable",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "taxable",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "stakeable",
				"type": "bool"
			}
		],
		"name": "updateFeatures",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "collector",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "percentage",
				"type": "uint256"
			}
		],
		"name": "updateTaxData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewMyStakings",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "nameOf",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "idOf",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timeat",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "completed",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "addr",
						"type": "address"
					}
				],
				"internalType": "struct MyToken.staking[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewPools",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "APY",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "time",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "limit",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "exists",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "stakedInHere",
						"type": "uint256"
					}
				],
				"internalType": "struct MyToken.stakingPool[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewTaxData",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "taxCollectorAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "percentage",
						"type": "uint256"
					}
				],
				"internalType": "struct MyToken.taxDetails",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewTokenDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "symbol",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "supply",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "mintable",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "burnable",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "stakeable",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "ht",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					}
				],
				"internalType": "struct MyToken.details",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const contract = new web3.eth.Contract(contractAbi,contractAddress)
var tokenContract; 
var ADDR;
var theAdd;
var globalName;
function m2(){
    if(window.ethereum){
        if(works){
            works = false
            mm.innerHTML = "<i class='fa-solid fa-spinner'></i>"
            ethereum.request({method: "eth_requestAccounts"}).then(accounts => {
                mm.classList.remove("hov")
                currac = accounts[0]
				theAdd = currac
                mm.innerHTML = `connected as: <b>${currac.slice(0,6)}...${currac.slice(36,42)}</b>`
                contract.methods.viewMyTokensAdresses(currac).call().then(result => tokens = result)
                mm.classList.add("fullacc")
                document.getElementById("a").style.display = "none"
                document.getElementById("mm2").style.display = "none"
                document.getElementById("b").style.display = "block"
                document.getElementById("maindiv").style.display = "block"
                
                mm.addEventListener("mouseover", () => {
                    document.getElementById("text4div").textContent = currac
                    document.getElementById("dadiv").style.display = "block"
                    document.getElementById("text4div").style.display = "block"
                })
                mm.addEventListener("mouseleave", () => {
                    document.getElementById("dadiv").style.display = "none"
                    document.getElementById("text4div").style.display = "none"
                }
                )
				document.getElementById("maindiv").innerHTML = "<i style='font-size:25px'><b>Loading...</b></i>"
                contract.methods.viewMyTokensAdresses(currac).call().then(result => {
					document.getElementById("maindiv").innerHTML = ""
                    no = 0
                    if (result.length > 0){
                    result.forEach(element => {
                        document.getElementById("maindiv").style.overflowY = "scroll"
                        var div = document.createElement("div")
                        var namea = document.createElement("h1")
                        var addr = document.createElement("p")
                        div.id = `tokenNumber${no}`
                        div.classList.add("infodiv")
                        addr.textContent = `address: ${element}`
						ADDR = element
                        addr.style.color = "white"
                        namea.style.color = "white"
                        namea.textContent = "abc";
                        contract.methods.viewMyTokensDetails(result[no]).call().then(results => {
                            console.log("symb: "+results.symbol)
                            console.log("nme: ", results.name)
                            namea.textContent = `${results.name} (${results.symbol})`
                            document.getElementById("maindiv").appendChild(div)
                        }) 
						fose = div.id
						div.appendChild(namea)
                		div.appendChild(addr)
						div.addEventListener("click", () => {
							var daName;
							contract.methods.viewMyTokensDetails(element).call().then((nameNotDep) => {
								daName = nameNotDep
								globalName = daName
							})
							console.log(namea.textContent)
							document.getElementById("maindiv").style.display = "none"
							document.getElementById("b").style.display = "none"
							document.getElementById("aside").style.display = "block"
							tokenContract = new web3.eth.Contract(tknAbi,element)
							console.log(element)
							tokenContract.methods.totalSupply().call().then(amount => {
								document.getElementById("header").textContent = `Welcome To ${daName[0]}'s Dashboard`
								dividedAmount = amount/10**18
								document.getElementById("total").textContent = `There Are Currently ${dividedAmount.toFixed(2)} ${daName[0]}s In Circulation`
							})
							document.getElementById("mn").classList.add("bc")
						}) 

                        console.log(namea, addr)
                        no++
                    });
                    } else{
                        not = document.createElement("h2")
                        not.innerHTML = "<i>You Have Not Created Any Tokens Yet. Please head to the token creator.</i>"
                        not.style.color = "white"
                        document.getElementById("maindiv").appendChild(not)
                    }})})}}}

function mintPage(){
	document.getElementById("notice").textContent = ""
	var wu
	document.getElementById("total2").textContent = ""
	tokenContract.methods.viewTokenDetails().call().then(result => {
		wu = result
		console.log(wu)
		document.getElementById("header").style.display = "none"
		document.getElementById("total").style.display = "none"
		document.getElementById("pageIndicator").textContent = "Mint Tokens"
		console.log("fose::: "+wu)
		if(wu[3]){
			document.getElementById("omgmintinnowcys").onclick = mint
			document.getElementById("amounts").style.display = "block"
			document.getElementById("amounts").placeholder = "amount of tokens"
			document.getElementById("omgmintinnowcys").style.display = "block"
			document.getElementById("omgmintinnowcys").textContent = "Mint Now!"
			document.getElementById("mint2").style.display = "block"
		}else{
			document.getElementById("notice").innerHTML = "<i><b>This Feature Has Not Been Activated. Please Head To The Update Features Tab</b></i>"
			document.getElementById("pageIndicator").textContent = ""
			document.getElementById("omgmintinnowcys").style.display = "none"
			document.getElementById("amounts").style.display = "none"
			document.getElementById("mint2").style.display = "none"
		}
	})
}

function burnPage(){
	document.getElementById("notice").textContent = ""
	var wu
	tokenContract.methods.viewTokenDetails().call().then(result => {
	wu=result
	document.getElementById("total2").textContent = ""
	document.getElementById("header").style.display = "none"
	document.getElementById("total").style.display = "none"
	document.getElementById("pageIndicator").textContent = "Burn Tokens"
	if(wu[4]){
		document.getElementById("header").style.display = "none"
		document.getElementById("total").style.display = "none"
		document.getElementById("pageIndicator").textContent = "Burn Tokens"
		document.getElementById("amounts").style.display = "block"
		document.getElementById("amounts").placeholder = "amount of tokens"
		document.getElementById("omgmintinnowcys").style.display = "block"
		document.getElementById("omgmintinnowcys").textContent = "Burn Now!"
		document.getElementById("omgmintinnowcys").onclick = burn
		document.getElementById("mint2").style.display = "none"
	}else{
		document.getElementById("notice").innerHTML = "<i><b>This Feature Has Not Been Activated. Please Head To The Update Features Tab</b></i>"
		document.getElementById("pageIndicator").textContent = ""
		document.getElementById("omgmintinnowcys").style.display = "none"
		document.getElementById("amounts").style.display = "none"
		document.getElementById("mint2").style.display = "none"
	}
	})
}

function taxPage(){
	document.getElementById("notice").textContent = ""
	var wu
	tokenContract.methods.viewTokenDetails().call().then(result => {
	wu=result
	document.getElementById("header").style.display = "none"
	document.getElementById("total").style.display = "none"
	if(wu[6]){
		document.getElementById("mint2").style.display = "block"
		tokenContract.methods.viewTaxData().call().then(result => {
			document.getElementById("total2").textContent = `address ${result[0]} collects ${result[1]}% of transactions`
		}) 
		document.getElementById("pageIndicator").textContent = "Update Tax Data"
		document.getElementById("amounts").style.display = "block"
		document.getElementById("amounts").placeholder = "percent"
		document.getElementById("omgmintinnowcys").style.display = "block"
		document.getElementById("omgmintinnowcys").textContent = "Tax Now!"
		document.getElementById("omgmintinnowcys").onclick = tax
	}else{
		document.getElementById("notice").innerHTML = "<i><b>This Feature Has Not Been Activated. Please Head To The Update Features Tab</b></i>"
		document.getElementById("pageIndicator").textContent = ""
		document.getElementById("omgmintinnowcys").style.display = "none"
		document.getElementById("amounts").style.display = "none"
		document.getElementById("mint2").style.display = "none"
	}
	})
}

function stakePage(){
	document.getElementById("notice").textContent = ""
	var wu
	tokenContract.methods.viewTokenDetails().call().then(result => {
	wu=result
	document.getElementById("header").style.display = "none"
	document.getElementById("total").style.display = "none"
	if(wu[5]){
		document.getElementById("mint2").style.display = "block"
		tokenContract.methods.viewPools().call().then(result => {
			result.forEach(element => {
				var pools = document.getElementById("pools")
				pools.style.display = "block"
				var div = document.createElement("div")
				div.classList.add("infodiv")
				var nametag = document.createElement("h3")
				var APY = document.createElement("h4")
				var time = document.createElement("h4")
				var limit = document.createElement("h4")
				nametag.textContent = `Name: ${element[0]}`
				APY.textContent = `APY: ${element[1]}`
				time.textContent = `lasts ${element[2]} seconds`
				limit.textContent = `limit is ${element[3]} seconds`
				pools.appendChild(div)
				div.appendChild(nametag);div.appendChild(APY);div.appendChild(time);div.appendChild(limit)
			})
		}) 
		document.getElementById("pageIndicator").textContent = "Update Staking Pools"
		document.getElementById("amounts").style.display = "block"
		document.getElementById("amounts").placeholder = "percent"
		document.getElementById("omgmintinnowcys").style.display = "block"
		document.getElementById("omgmintinnowcys").textContent = "Tax Now!"
		document.getElementById("omgmintinnowcys").onclick = stakeUpdate
	}else{
		document.getElementById("notice").innerHTML = "<i><b>This Feature Has Not Been Activated. Please Head To The Update Features Tab</b></i>"
		document.getElementById("pageIndicator").textContent = ""
		document.getElementById("omgmintinnowcys").style.display = "none"
		document.getElementById("amounts").style.display = "none"
		document.getElementById("mint2").style.display = "none"
	}
	})
}

async function tax(){
	document.getElementById("omgmintinnowcys").innerHTML = "<i class='fa-solid fa-spinner'></i>"
	am = document.getElementById("amounts").value
	await tokenContract.methods.updateTaxData(document.getElementById("mint2").value,am).send({from: theAdd, value: 0})
	document.getElementById("header").style.display = "block"
	document.getElementById("amounts").placeholder = "percent"
	document.getElementById("total").style.display = "block"
	document.getElementById("pageIndicator").textContent = ""
	document.getElementById("amounts").style.display = "none"
	document.getElementById("omgmintinnowcys").style.display = "none"
	document.getElementById("mint2").style.display = "none"
	document.getElementById("warning").style.display = "block"
	document.getElementById("total2").textContent = ""
	document.getElementById("pageIndicator").textContent = ""
	document.getElementById("amounts").style.display = "none"
	document.getElementById("mint2").style.display = "none"
	document.getElementById("warning").innerHTML = `<button style='border:0px;background-color:greenyellow' onclick='destroy('warning')'>x</button><h4>successfuly updated tax info.</h4>`
	setTimeout(()=>{document.getElementById("warning").style.display = "none"},5000)
}

async function mint(){
	document.getElementById("omgmintinnowcys").innerHTML = "<i class='fa-solid fa-spinner'></i>"
	am = document.getElementById("amounts").value
	await tokenContract.methods.mint(am,document.getElementById("mint2").value).send({from: theAdd, value: 0})
	document.getElementById("header").style.display = "block"
	document.getElementById("total").style.display = "block"
	document.getElementById("pageIndicator").textContent = ""
	document.getElementById("amounts").style.display = "none"
	document.getElementById("omgmintinnowcys").style.display = "none"
	document.getElementById("mint2").style.display = "none"
	document.getElementById("warning").style.display = "block"
	document.getElementById("warning").innerHTML = `<button style='border:0px;background-color:greenyellow' onclick='destroy('warning')'>x</button><h4>successfuly minted ${am} tokens</h4>`
	setTimeout(()=>{document.getElementById("warning").style.display = "none"},5000)
}

async function burn(){
	document.getElementById("omgmintinnowcys").innerHTML = "<i class='fa-solid fa-spinner'></i>"
	am = document.getElementById("amounts").value
	await tokenContract.methods.burn(am,ADDR).send({from:theAdd})
	document.getElementById("header").style.display = "block"
	document.getElementById("total").style.display = "block"
	document.getElementById("pageIndicator").textContent = ""
	document.getElementById("amounts").style.display = "none"
	document.getElementById("omgmintinnowcys").style.display = "none"
	document.getElementById("mint2").style.display = "none"
	document.getElementById("warning").style.display = "block"
	document.getElementById("warning").innerHTML = `<button style='border:0px;background-color:greenyellow' onclick='destroy('warning')'>x</button><h4>successfuly burned ${am} tokens</h4>`
	setTimeout(()=>{document.getElementById("warning").style.display = "none"},5000)
}

function home(){
	tokenContract.methods.totalSupply().call().then(amount => {
		document.getElementById("header").style.display = "block"
		document.getElementById("total").style.display = "block"
		document.getElementById("header").textContent = `Welcome To ${globalName[0]}'s Dashboard`
		dividedAmount = amount/10**18
		document.getElementById("total").textContent = `There Are Currently ${dividedAmount.toFixed(2)} ${globalName[0]}s In Circulation`
		document.getElementById("pageIndicator").textContent = ""
		document.getElementById("amounts").style.display = "none"
		document.getElementById("omgmintinnowcys").style.display = "none"
		document.getElementById("mint2").style.display = "none"
		document.getElementById("notice").textContent = ""
	})
}
function destroy(element){
	console.log(element)
	document.getElementById(element).style.display = "none"
}