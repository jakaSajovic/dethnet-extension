// Define the DethExtension as an IIFE for encapsulation.
const DethExtension = (() => {
    // A map of domain replacements to be used.
    const domainReplacements = {
        'optimistic.etherscan.io': 'optimistic.etherscan.deth.net',
        'polygonscan.com': 'polygonscan.deth.net',
        'snowtrace.io': 'snowtrace.deth.net',
        'arbiscan.io': 'arbiscan.deth.net',
        'etherscan.io': 'etherscan.deth.net',
    };

    // Get the current domain of the website.
    const currentDomain = location.hostname;

    /**
     * Returns the replacement domain for a given domain.
     * @param {string} domain - The domain to be replaced.
     * @returns {string} - The replacement domain or an error message.
     */
    function getReplacementDomain(domain) {
        return domainReplacements[domain] || `Unexpected domain: ${domain}. The extension is designed to work with specific sites, but this domain is not recognized.`;
    }

    /**
     * Inserts a link with an icon into the page.
     * @param {string} newUrl - The URL to which the link should point.
     */
    function addElement(newUrl) {
        // Create an anchor element.
        const anchorElement = document.createElement("a");
        anchorElement.setAttribute("href", newUrl);
        anchorElement.setAttribute("target", "_blank");
        anchorElement.setAttribute("rel", "noopener noreferrer"); // For security when using "_blank"

        // Create an image (icon) element and set its properties.
        const iconElement = document.createElement("img");
        iconElement.setAttribute("src", chrome.runtime.getURL("images/link-icon.png")); 
        iconElement.setAttribute("alt", "Link to Deth.net");
        iconElement.style.cursor = "pointer"; 
        iconElement.style.marginLeft = "15px";
        
        // Append the icon to the anchor.
        anchorElement.appendChild(iconElement);
        
        // Locate the desired insertion point in the DOM and insert the anchor.
        const contentPlace = document.querySelector("#ContentPlaceHolder1_copyButtonPanel");
        if (contentPlace) {
            contentPlace.after(anchorElement);
        } else {
            // If the insertion point is not found, log an error.
            console.error("Couldn't find the specified location to insert the link.");
        }
    }

    // The public API of the module: an init function.
    return {
        /**
         * Initializes the extension functionality.
         */
        init: function() {
            // Get the replacement domain.
            const replacementDomain = getReplacementDomain(currentDomain);
            
            // Generate the new URL.
            const newUrl = window.location.toString().replace(currentDomain, replacementDomain);

            // If the domain is unexpected, log an error and exit.
            if (replacementDomain.startsWith('Unexpected domain')) {
                console.error(replacementDomain);
                return;
            }

            // Insert the element into the page.
            addElement(newUrl);
        }
    };
})();

// Invoke the initialization method of the DethExtension.
DethExtension.init();
