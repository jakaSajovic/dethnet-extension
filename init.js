//Gets domain name of the website (ex. 'www.xyz.com')
let site = location.hostname;

//Depending on the 
function urlReplace(x) {
    switch (x) {
        case 'optimistic.etherscan.io':
            url = 'optimistic.etherscan.deth.net';
            break;
        case 'polygonscan.com':
            url = 'polygonscan.deth.net';
            break;
        case 'snowtrace.io':
            url = 'snowtrace.deth.net';
            break;
        case 'arbiscan.io':
            url = 'arbiscan.deth.net';
            break;
        case 'etherscan.io':
            url = 'etherscan.deth.net';
            break;
        default:
            console.log("something went wrong");
    }
    return url;
}
urlReplace(site);

//Creates new url which replaces top level domain (.io, .com,...) with (.deth.net); 
let newUrl = window.location.toString().replace(site, url);
                        
//Adds an anchor element with link to deth.net
function addElement() {
    const newAnchor = document.createElement("a");
    newAnchor.setAttribute("href", newUrl);
    newAnchor.appendChild(document.createTextNode("  deth.net"));
    document.querySelector("#ContentPlaceHolder1_copyButtonPanel").after(newAnchor);
}
addElement(); 
