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

        let detailsHtml = `
            <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">${spec["Use of purposes"]}</h1>
            <p class="text-lg text-gray-600 mb-6">${spec["Media Type"] || "N/A"} asset</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">Key Dimensions</h3>
                    <p class="text-gray-700 text-lg"><strong>Recommended:</strong> ${spec["Recommended Dimensions (Pixels)"] || "N/A"}</p>
                    <p class="text-gray-700 text-lg"><strong>Min:</strong> ${spec["Min Dimensions (Pixels)"] || "N/A"}</p>
                    <p class="text-gray-700 text-lg"><strong>Max:</strong> ${spec["Max Dimensions (Pixels)"] || "N/A"}</p>
                    <p class="text-gray-700 text-lg"><strong>Aspect Ratio:</strong> ${spec["Aspect Ratio"] || "N/A"}</p>
                    <p class="text-gray-700 text-lg"><strong>Orientation:</strong> ${spec["Orientation"] || "N/A"}</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">File Specifications</h3>
                    <p class="text-gray-700 text-lg"><strong>Recommended Resolution:</strong> ${spec["Recommended File Resolution"] || "N/A"}</p>
                    <p class="text-gray-700 text-lg"><strong>Recommended Formats:</strong> ${spec["Recommended File Formats"] || "N/A"}</p>
                    <p class="text-gray-700 text-lg"><strong>Min File Size:</strong> ${spec["Minimum File Size"] || "N/A"}</p>
                    <p class="text-gray-700 text-lg"><strong>Max File Size:</strong> ${spec["Maximum File Size"] || "N/A"}</p>
                    <p class="text-gray-700 text-lg"><strong>Video Length Limits:</strong> ${spec["Video Length Limits (if applicable)"] || "N/A"}</p>
                </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg mb-8">
                <h3 class="text-xl font-semibold text-gray-800 mb-2">Text Limits</h3>
                <p class="text-gray-700 text-lg"><strong>Primary Text/Body:</strong> ${spec["Max Characters - Primary Text/Body"] || "N/A"}</p>
                <p class="text-gray-700 text-lg"><strong>Headline:</strong> ${spec["Max Characters - Headline"] || "N/A"}</p>
                <p class="text-gray-700 text-lg"><strong>Description:</strong> ${spec["Max Characters - Description"] || "N/A"}</p>
                <p class="text-gray-700 text-lg"><strong>CTA:</strong> ${spec["Max Characters - CTA"] || "N/A"}</p>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg mb-8">
                <h3 class="text-xl font-semibold text-gray-800 mb-2">Important Notes</h3>
                <p class="text-gray-700">${spec["Important notes"] || "No specific notes available."}</p>
            </div>

            <p class="text-gray-500 text-sm mt-6">Last Updated: ${spec["Last Updated Date"] || "N/A"}</p>
            ${spec["The exact source URL"] && spec["The exact source URL"] !== "N/A" ?
                `<p class="text-gray-500 text-sm mt-2">Source: <a href="${spec["The exact source URL"]}" target="_blank" class="text-blue-600 hover:underline">${spec["The exact source URL"]}</a></p>` : ''}
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

    // --- Feedback Modal Logic (Copied from index.html's script for consistency on detail page) ---
    const suggestionBoxBtn = document.getElementById('suggestion-box-btn');
    const feedbackModalOverlay = document.getElementById('feedback-modal-overlay');
    const feedbackModalCloseBtn = document.getElementById('feedback-modal-close-btn');

    if (suggestionBoxBtn && feedbackModalOverlay && feedbackModalCloseBtn) {
        suggestionBoxBtn.addEventListener('click', () => {
            feedbackModalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        feedbackModalOverlay.addEventListener('click', (event) => {
            if (event.target === feedbackModalOverlay) {
                feedbackModalOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        feedbackModalCloseBtn.addEventListener('click', () => {
            feedbackModalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
});
