let url = window.location.toString(); 
let newUrl = url.replace(/etherscan.io/, 'etherscan.deth.net');

function addElement() {
    const newAnchor = document.createElement("a");
    newAnchor.setAttribute("href", newUrl);
    const newContent = document.createTextNode("  Go to deth.net");

    newAnchor.appendChild(newContent);

    document.querySelector("#ContentPlaceHolder1_copyButtonPanel").after(newAnchor);
}

addElement(); 