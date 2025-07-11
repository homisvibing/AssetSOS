// JavaScript for Mobile Navigation Menu, Data Loading, Search, Filtering, and Feedback Modal

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Logic ---
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

    const openMobileMenu = () => {
        mobileNavOverlay.classList.add('active');
        mobileNavMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMobileMenu = () => {
        mobileNavOverlay.classList.remove('active');
        mobileNavMenu.classList.remove('active');
        document.body.style.overflow = '';
    };

    mobileMenuButton.addEventListener('click', openMobileMenu);
    mobileNavOverlay.addEventListener('click', closeMobileMenu);
    closeButton.addEventListener('click', closeMobileMenu);

    mobileNavMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // --- Asset Specification Data ---
    let digitalSpecsData = [];
    let offlineSpecsData = [];
    let currentData = []; // Will hold either digitalSpecsData or offlineSpecsData

    // --- Dynamic Spec Card Rendering ---
    const specCardsContainer = document.querySelector('section:nth-of-type(3) > div.grid');

    function renderSpecCards(dataToRender) {
        specCardsContainer.innerHTML = ''; // Clear existing cards

        if (dataToRender.length === 0) {
            specCardsContainer.innerHTML = '<p class="text-gray-600 text-center col-span-full py-8">No specifications found matching your criteria.</p>';
            return;
        }

        dataToRender.forEach(spec => {
            const card = document.createElement('div');
            card.classList.add('bg-white', 'p-6', 'rounded-xl', 'shadow-md', 'hover:shadow-lg', 'transition-shadow');

            let dimensions = spec["Recommended Dimensions (Pixels)"] || "N/A";
            let orientation = spec["Orientation"] && spec["Orientation"] !== "N/A" ? spec["Orientation"] + ", " : "";
            let aspectRatio = spec["Aspect Ratio"] && spec["Aspect Ratio"] !== "N/A" ? spec["Aspect Ratio"] + " aspect ratio" : "";
            let lastUpdated = spec["Last Updated Date"] || "N/A";
            // let mediaType = spec["Media Type"] || "N/A"; // Not directly used in card display, but useful for filtering

            let cardTitle = spec["Use of purposes"] || "Unknown Spec";
            if (spec["Media Type"] && spec["Media Type"] !== "N/A" && !cardTitle.toLowerCase().includes(spec["Media Type"].toLowerCase())) {
                cardTitle = `${cardTitle} (${spec["Media Type"]})`;
            }

            let charLimits = [];
            if (spec["Max Characters - Primary Text/Body"] && spec["Max Characters - Primary Text/Body"] !== "N/A") {
                charLimits.push(`Body: ${spec["Max Characters - Primary Text/Body"]} chars`);
            }
            if (spec["Max Characters - Headline"] && spec["Max Characters - Headline"] !== "N/A") {
                charLimits.push(`Headline: ${spec["Max Characters - Headline"]} chars`);
            }
            if (spec["Max Characters - Description"] && spec["Max Characters - Description"] !== "N/A") {
                charLimits.push(`Desc: ${spec["Max Characters - Description"]} chars`);
            }
            if (spec["Max Characters - CTA"] && spec["Max Characters - CTA"] !== "N/A") {
                charLimits.push(`CTA: ${spec["Max Characters - CTA"]} chars`);
            }
            const charLimitsHtml = charLimits.length > 0 ? `<p class="text-gray-600 text-xs mt-2">Text Limits: ${charLimits.join(' | ')}</p>` : '';

            card.innerHTML = `
                <h3 class="text-xl font-semibold text-blue-700 mb-2">${cardTitle}</h3>
                <p class="text-gray-600 text-sm mb-4">${orientation}${aspectRatio}</p>
                <p class="text-gray-700 font-bold">${dimensions}</p>
                ${charLimitsHtml}
                <p class="text-gray-500 text-xs mt-2">Last Updated: ${lastUpdated}</p>
            `;
            specCardsContainer.appendChild(card);
        });
    }

    // --- Filter Element References ---
    const searchInput = document.querySelector('.hero-section input[type="text"]');
    const searchButton = document.querySelector('.hero-section button');
    const platformSelect = document.getElementById('platform-select');
    const assetTypeSelect = document.getElementById('asset-type-select');
    const mediaTypeSelect = document.getElementById('media-type-select');
    const digitalToggleButton = document.querySelector('.filter-options-section .flex button:first-child');
    const offlineToggleButton = document.querySelector('.filter-options-section .flex button:last-child');

    // --- Populate Filter Dropdowns ---
    function populateFilterDropdown(selectElement, data, key) {
        selectElement.innerHTML = '<option value="">All</option>'; // Clear existing options
        const uniqueValues = [...new Set(data.map(item => item[key]).filter(value => value && value !== "N/A"))].sort();
        uniqueValues.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            selectElement.appendChild(option);
        });
    }

    // --- Combined Filtering Function ---
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedPlatform = platformSelect.value.toLowerCase();
        const selectedAssetType = assetTypeSelect.value.toLowerCase();
        const selectedMediaType = mediaTypeSelect.value.toLowerCase();

        const filteredData = currentData.filter(spec => {
            const matchesSearch = (
                (spec["Use of purposes"] && spec["Use of purposes"].toLowerCase().includes(searchTerm)) ||
                (spec["Media Type"] && spec["Media Type"].toLowerCase().includes(searchTerm)) ||
                (spec["Orientation"] && spec["Orientation"].toLowerCase().includes(searchTerm)) ||
                (spec["Important notes"] && spec["Important notes"].toLowerCase().includes(searchTerm))
            );

            // Platform/Category filter: checks if 'Use of purposes' contains the selected platform
            const matchesPlatform = selectedPlatform === "" ||
                                    (spec["Use of purposes"] && spec["Use of purposes"].toLowerCase().includes(selectedPlatform));

            // Asset Type filter: checks if 'Use of purposes' contains the selected asset type
            const matchesAssetType = selectedAssetType === "" ||
                                     (spec["Use of purposes"] && spec["Use of purposes"].toLowerCase().includes(selectedAssetType));

            // Media Type filter: exact match for 'Media Type'
            const matchesMediaType = selectedMediaType === "" ||
                                     (spec["Media Type"] && spec["Media Type"].toLowerCase() === selectedMediaType);

            return matchesSearch && matchesPlatform && matchesAssetType && matchesMediaType;
        });

        renderSpecCards(filteredData);
    }

    // --- Event Listeners for Search and Filters ---
    searchButton.addEventListener('click', applyFilters);
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            applyFilters();
        }
    });

    platformSelect.addEventListener('change', applyFilters);
    assetTypeSelect.addEventListener('change', applyFilters);
    mediaTypeSelect.addEventListener('change', applyFilters);

    // --- Digital / Offline Toggle ---
    digitalToggleButton.addEventListener('click', () => {
        digitalToggleButton.classList.remove('bg-gray-200', 'text-gray-800');
        digitalToggleButton.classList.add('bg-blue-600', 'text-white');
        offlineToggleButton.classList.remove('bg-blue-600', 'text-white');
        offlineToggleButton.classList.add('bg-gray-200', 'text-gray-800');

        currentData = digitalSpecsData; // Set active data to digital
        populateFilterDropdown(platformSelect, currentData, "Use of purposes");
        populateFilterDropdown(mediaTypeSelect, currentData, "Media Type");
        populateFilterDropdown(assetTypeSelect, currentData, "Use of purposes"); // Populate asset type with all 'Use of purposes' for now

        applyFilters(); // Re-apply filters with new data source
    });

    offlineToggleButton.addEventListener('click', () => {
        offlineToggleButton.classList.remove('bg-gray-200', 'text-gray-800');
        offlineToggleButton.classList.add('bg-blue-600', 'text-white');
        digitalToggleButton.classList.remove('bg-blue-600', 'text-white');
        digitalToggleButton.classList.add('bg-gray-200', 'text-gray-800');

        currentData = offlineSpecsData; // Set active data to offline
        if (currentData.length === 0) {
            specCardsContainer.innerHTML = '<p class="text-gray-600 text-center col-span-full py-8">Offline (Printing) specifications coming soon!</p>';
            // Clear and disable filter dropdowns for offline mode if no data
            platformSelect.innerHTML = '<option value="">All</option>';
            assetTypeSelect.innerHTML = '<option value="">All</option>';
            mediaTypeSelect.innerHTML = '<option value="">All</option>';
            // You might want to disable them:
            // platformSelect.disabled = true;
            // assetTypeSelect.disabled = true;
            // mediaTypeSelect.disabled = true;
        } else {
            populateFilterDropdown(platformSelect, currentData, "Use of purposes");
            populateFilterDropdown(mediaTypeSelect, currentData, "Media Type");
            populateFilterDropdown(assetTypeSelect, currentData, "Use of purposes"); // Populate asset type for offline data
            applyFilters(); // Re-apply filters with new data source
        }
    });

    // --- Initial Data Fetch and Setup ---
    // Use Promise.all to fetch both digital and offline data concurrently
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
        digitalSpecsData = digitalData;
        offlineSpecsData = offlineData;
        currentData = digitalSpecsData; // Default to digital data on load

        populateFilterDropdown(platformSelect, currentData, "Use of purposes");
        populateFilterDropdown(mediaTypeSelect, currentData, "Media Type");
        populateFilterDropdown(assetTypeSelect, currentData, "Use of purposes");
        renderSpecCards(currentData); // Initial render of digital specs
    })
    .catch(error => {
        console.error('Error fetching specifications:', error);
        specCardsContainer.innerHTML = '<p class="text-red-600 text-center col-span-full py-8">Failed to load specifications. Please ensure `digital_specs.json` and `offline_specs.json` exist in the root directory.</p>';
    });

    // --- Feedback Modal Logic ---
    const suggestionBoxBtn = document.getElementById('suggestion-box-btn');
    const feedbackModalOverlay = document.getElementById('feedback-modal-overlay');
    const feedbackModalCloseBtn = document.getElementById('feedback-modal-close-btn');

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
});