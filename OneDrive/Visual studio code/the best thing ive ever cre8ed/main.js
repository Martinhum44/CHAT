
const web3 = new Web3(window.ethereum);
console.log(web3)

var works = true
var mm = document.getElementById("metamask")
var md = document.getElementById("maindiv")
var currac
var stepno = 1
var ans = []
var price = 0

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


const contract = new web3.eth.Contract(contractAbi,contractAddress)
console.log(contract)

function metamagic() {
    if(window.ethereum){
        if(works){
            works = false
            document.getElementById("metamask").innerHTML = "<i class='fa-solid fa-spinner'></i>"
            document.getElementById("metamask").classList.remove("hov")
            ethereum.request({method: "eth_requestAccounts"}).then((accounts) => {
                stepno++
                currac = accounts[0]
                contract.methods.viewMyTokensAdresses(currac).call().then(result => console.log( "Address of your token: "+result))
                mm.innerHTML = `connected as: <b>${currac.slice(0,6)}...${currac.slice(36,42)}</b>`
                document.getElementById("mesbod").textContent = `Connected to your wallet successfuly! address: ${accounts[0]}`;
                mm.classList.add("fullacc")
                document.getElementById("message").style.backgroundColor = "#7DDA58";
                document.getElementById("message").style.display = "none";
                document.getElementById("xbut").style.backgroundColor = "#7DDA58";
                document.getElementById("cn2").style.display = "none";
                document.getElementById("th1").style.display = "none";
                document.getElementById("maindiv").style.marginTop = "40px";
                
                for(var i = 1; i < 9; i++){
                    document.getElementById("st2a" + i).style.display = "block"
                }
                document.getElementById("stepindicator").textContent = "step 2"
                
                mm.addEventListener("mouseover", () => {
                    document.getElementById("text4div").textContent = currac
                    document.getElementById("dadiv").style.display = "block"
                    document.getElementById("text4div").style.display = "block"
                })
                mm.addEventListener("mouseleave", () => {
                    document.getElementById("dadiv").style.display = "none"
                    document.getElementById("text4div").style.display = "none"
                })
            })
        }
    }
}

function no3() {
    ans.push(Number(document.getElementById("st2a5").value))
    console.log("hey there: "+ ans)
    for(var i = 1; i < 9; i++){
        document.getElementById("st2a" + i).style.display = "none"
    }
    for(var i = 1; i < 9; i++){
        document.getElementById("st3a" + i).style.display = "block"
    }
    document.getElementById("stepindicator").textContent = "step 3"
}

function no4() {
    ans.push(document.getElementById("st3a4").value)
    ans.push(document.getElementById("st3a6").value) 
    ans.push(false)
    ans.push(false)
    ans.push(false)
    ans.push(false)
    for(var i = 1; i < 9; i++){
        document.getElementById("st3a" + i).style.display = "none"
    }
    for(var i = 1; i < 21; i++){
        document.getElementById("st4a" + i).style.display = "block"
    }
    for(var i = 4; i < 20; i++){
        document.getElementById("st4a" + i).style.display = "inline"
        document.getElementById("st4a" + i).style.marginBottom = "25px"
    }
    document.getElementById("stepindicator").textContent = "step 4"
}

window.onload = function(){
document.getElementById("st4a6").addEventListener("change", (event) => {
    if (event.target.checked) {
        ans[3] = true
    } else{
        ans[3] = false
    }
})

document.getElementById("st4a10").addEventListener("change", (event) => {
    if (event.target.checked) {
        ans[4] = true
    } else{
        ans[4] = false
    }
})

document.getElementById("st4a14").addEventListener("change", (event) => {
    if (event.target.checked) {
        price += 0.01
        document.getElementById("st4a20").textContent = `Create Token (${price.toFixed(2)} ether + gas)`
        ans[5] = true
    } else{
        price -= 0.01
        document.getElementById("st4a20").textContent = `Create Token (${price.toFixed(2)} ether + gas)`

        if (price.toFixed(2) == 0){
            document.getElementById("st4a20").textContent = `Create Token (Free + gas)`
        }
        ans[5] = false
    }
    console.log(event)
})

document.getElementById("st4a18").addEventListener("change", (event) => {
    if (event.target.checked) {
        price += 0.05
        document.getElementById("st4a20").textContent = `Create Token (${price.toFixed(2)} ether + gas)`
        ans[6] = true
    } else{
        price -= 0.05
        document.getElementById("st4a20").textContent = `Create Token (${price.toFixed(2)} ether + gas)`
        if (price.toFixed(2) == 0){
            document.getElementById("st4a20").textContent = `Create Token (Free + gas)`
        }
        ans[6] = false
    }
    console.log(event)
})
}

async function finish() {
    console.log(ans)
    console.log(contract.methods)
    document.getElementById("st4a20").innerHTML = "<i class='fa-solid fa-spinner'></i>"
    try {
        const result = await contract.methods.mintToken(ans[1], ans[2], ans[0], ans[3], ans[4], ans[6], ans[5]).send({from: currac, value: price*10**18})
        console.log(result);
        for(var i = 1; i < 21; i++){
            document.getElementById("st4a" + i).style.display = "none"
        }
        for(var i = 1; i < 6; i++){
            document.getElementById("st5a" + i).style.display = "block"
        }
        contract.methods.viewMyTokensAdresses(currac).call().then(result => {document.getElementById("st5a2").textContent = "Address of your token: "+result[result.length-1]
		console.log(result.transactionHash)
		document.getElementById("st5a5").href = `https://sepolia.etherscan.io/address/${result[result.length-1]}`
	})
		
    } catch (error) {
        console.error(error)
		document.getElementById("st4a20").textContent = `Create Token (${price.toFixed(2)} ether + gas)`
        if (price.toFixed(2) == 0){
            document.getElementById("st4a20").textContent = `Create Token (Free + gas)`
        }
    }
}

function gotit(){
	window.location = "dashboard.html"
}