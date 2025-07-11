// JavaScript for Specific Asset Detail Page (detail.html)

document.addEventListener('DOMContentLoaded', () => {
    const assetDetailContent = document.getElementById('asset-detail-content');
    let allSpecsData = []; // To hold combined digital and offline data

    // Function to parse URL query parameters
    function getQueryParams() {
        const params = {};
        window.location.search.substring(1).split('&').forEach(param => {
            const pair = param.split('=');
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        });
        return params;
    }

    // Function to render a single spec's details
    function renderSpecDetails(spec) {
        if (!spec) {
            assetDetailContent.innerHTML = '<p class="text-red-600 text-center py-8">Asset not found. Please go back to the homepage.</p>';
            return;
        }

        // Helper function to create table rows for key-value pairs
        function createTableRow(label, value) {
            if (value === "N/A" || !value) {
                return ''; // Don't render if N/A or empty
            }
            return `
                <tr>
                    <td class="py-2 px-4 font-medium">${label}:</td>
                    <td class="py-2 px-4">${value}</td>
                </tr>
            `;
        }

        // Process Important Notes into bullet points
        let notesHtml = '';
        if (spec["Important notes"] && spec["Important notes"] !== "N/A") {
            // Split by common delimiters like semicolons, periods, or newlines
            const notesArray = spec["Important notes"].split(/; |\.\s*|\n/).filter(note => note.trim() !== '');
            if (notesArray.length > 0) {
                notesHtml = `<ul class="list-disc pl-5 mt-2">`;
                notesArray.forEach(note => {
                    notesHtml += `<li>${note.trim().replace(/\.$/, '')}.</li>`; // Ensure periods at end
                });
                notesHtml += `</ul>`;
            } else {
                notesHtml = `<p>${spec["Important notes"]}</p>`; // Fallback if no clear split
            }
        } else {
            notesHtml = `<p>No specific notes available.</p>`;
        }


        let detailsHtml = `
            <h1 class="text-3xl md:text-4xl font-extrabold text-accent-yellow mb-4">${spec["Use of purposes"]}</h1>
            <p class="text-lg text-light-cream opacity-80 mb-6">${spec["Media Type"] || "N/A"} asset</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="info-box p-4 rounded-lg">
                    <h3 class="text-xl font-semibold text-accent-yellow mb-2">Key Dimensions</h3>
                    <table class="info-table">
                        <tbody>
                            ${createTableRow("Recommended", spec["Recommended Dimensions (Pixels)"])}
                            ${createTableRow("Min Dimensions", spec["Min Dimensions (Pixels)"])}
                            ${createTableRow("Max Dimensions", spec["Max Dimensions (Pixels)"])}
                            ${createTableRow("Aspect Ratio", spec["Aspect Ratio"])}
                            ${createTableRow("Orientation", spec["Orientation"])}
                        </tbody>
                    </table>
                </div>
                <div class="info-box p-4 rounded-lg">
                    <h3 class="text-xl font-semibold text-accent-yellow mb-2">File Specifications</h3>
                    <table class="info-table">
                        <tbody>
                            ${createTableRow("Recommended Resolution", spec["Recommended File Resolution"])}
                            ${createTableRow("Recommended Formats", spec["Recommended File Formats"])}
                            ${createTableRow("Min File Size", spec["Minimum File Size"])}
                            ${createTableRow("Max File Size", spec["Maximum File Size"])}
                            ${createTableRow("Video Length Limits", spec["Video Length Limits (if applicable)"])}
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="info-box p-4 rounded-lg mb-8">
                <h3 class="text-xl font-semibold text-accent-yellow mb-2">Text Limits</h3>
                <table class="info-table">
                    <tbody>
                        ${createTableRow("Primary Text/Body", spec["Max Characters - Primary Text/Body"])}
                        ${createTableRow("Headline", spec["Max Characters - Headline"])}
                        ${createTableRow("Description", spec["Max Characters - Description"])}
                        ${createTableRow("CTA", spec["Max Characters - CTA"])}
                    </tbody>
                </table>
            </div>

            <div class="info-box p-4 rounded-lg mb-8">
                <h3 class="text-xl font-semibold text-accent-yellow mb-2">Important Notes</h3>
                ${notesHtml}
            </div>

            <p class="text-light-cream text-sm mt-6 opacity-60">Last Updated: ${spec["Last Updated Date"] || "N/A"}</p>
            ${spec["The exact source URL"] && spec["The exact source URL"] !== "N/A" ?
                `<p class="text-light-cream text-sm mt-2 opacity-60">Source: <a href="${spec["The exact source URL"]}" target="_blank" class="text-accent-yellow hover:underline">${spec["The exact source URL"]}</a></p>` : ''}
        `;
        assetDetailContent.innerHTML = detailsHtml;
    }

    // --- Initial Data Fetch and Render Details ---
    const queryParams = getQueryParams();
    const requestedPurpose = queryParams.purpose;
    const requestedType = queryParams.type; // 'digital' or 'offline'

    if (!requestedPurpose || !requestedType) {
        assetDetailContent.innerHTML = '<p class="text-red-600 text-center py-8">Invalid asset request. Please go back to the homepage.</p>';
        return;
    }

    Promise.all([
        fetch('digital_specs.json').then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status} for digital_specs.json`);
            return response.json();
        }),
        fetch('offline_specs.json').then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status} for offline_specs.json`);
            return response.json();
        })
    ])
    .then(([digitalData, offlineData]) => {
        allSpecsData = digitalData.concat(offlineData); // Combine all data

        const foundSpec = allSpecsData.find(spec =>
            spec["Use of purposes"] === requestedPurpose &&
            (requestedType === 'digital' && digitalData.includes(spec) ||
             requestedType === 'offline' && offlineData.includes(spec))
        );

        renderSpecDetails(foundSpec);
    })
    .catch(error => {
        console.error('Error fetching specifications for detail page:', error);
        assetDetailContent.innerHTML = '<p class="text-red-600 text-center py-8">Failed to load asset details. Please try again later.</p>';
    });

    // --- Mobile Navigation Logic (Copied from index.html's script for consistency on detail page) ---
    // These elements might not exist on detail.html if it's a standalone page,
    // so we check for their existence before adding listeners.
    const mobileMenuButton = document.querySelector('header button.md\\:hidden');
    const mobileNavOverlay = document.createElement('div');
    mobileNavOverlay.classList.add('mobile-nav-overlay');
    document.body.appendChild(mobileNavOverlay);

    const mobileNavMenu = document.createElement('nav');
    mobileNavMenu.classList.add('mobile-nav-menu');
    document.body.appendChild(mobileNavMenu);

    const desktopNavLinks = document.querySelectorAll('header nav.md\\:flex a');
    desktopNavLinks.forEach(link => {
        const clonedLink = link.cloneNode(true);
        mobileNavMenu.appendChild(clonedLink);
    });

    const closeButton = document.createElement('button');
    closeButton.classList.add('close-btn');
    closeButton.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <span class="sr-only">Close Menu</span>
    `;
    mobileNavMenu.prepend(closeButton);

    if (mobileMenuButton) { // Only add if button exists
        mobileMenuButton.addEventListener('click', () => {
            mobileNavOverlay.classList.add('active');
            mobileNavMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    mobileNavOverlay.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('active');
        mobileNavMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
    closeButton.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('active');
        mobileNavMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
    mobileNavMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('active');
            mobileNavMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });


    // --- Feedback Modal Logic (Copied from index.html's script for consistency on detail page) ---
    const suggestionBoxBtn = document.getElementById('suggestion-box-btn');
    const feedbackModalOverlay = document.getElementById('feedback-modal-overlay');
    const feedbackModalCloseBtn = document.getElementById('feedback-modal-close-btn');

    // Check if elements exist before adding listeners to prevent errors on other pages
    if (suggestionBoxBtn && feedbackModalOverlay && feedbackModalCloseBtn) {
        suggestionBoxBtn.addEventListener('click', () => {
            feedbackModalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        feedbackModalOverlay.addEventListener('click', (event) => {
            // Close if click is on the overlay itself, not the modal content
            if (event.target === feedbackModalOverlay) {
                feedbackModalOverlay.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
        });

        feedbackModalCloseBtn.addEventListener('click', () => {
            feedbackModalOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
});
