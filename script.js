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

    // Clone desktop navigation links for mobile menu
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
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeMobileMenu = () => {
        mobileNavOverlay.classList.remove('active');
        mobileNavMenu.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    };

    mobileMenuButton.addEventListener('click', openMobileMenu);
    mobileNavOverlay.addEventListener('click', closeMobileMenu);
    closeButton.addEventListener('click', closeMobileMenu);

    // Close mobile menu when a navigation link is clicked
    mobileNavMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // --- Asset Specification Data ---
    let digitalSpecsData = [];
    let offlineSpecsData = [];
    let currentData = []; // Will hold either digitalSpecsData or offlineSpecsData
    const initialCardLimit = 9; // Number of cards to show initially
    let showingAllCards = false; // Flag to track if all cards are being shown

    // --- Dynamic Spec Card Rendering ---
    const specCardsContainer = document.querySelector('section:nth-of-type(3) > div.grid');
    const viewAllButtonContainer = document.getElementById('view-all-button-container');
    const viewAllSpecsBtn = document.getElementById('view-all-specs-btn');

    function renderSpecCards(dataToRender, limit = null) {
        specCardsContainer.innerHTML = ''; // Clear existing cards

        if (dataToRender.length === 0) {
            specCardsContainer.innerHTML = '<p class="text-F3F3E0 text-center col-span-full py-8">No specifications found matching your criteria.</p>';
            viewAllButtonContainer.classList.add('hidden'); // Hide view all button if no results
            return;
        }

        const dataToDisplay = limit && dataToRender.length > limit && !showingAllCards ? dataToRender.slice(0, limit) : dataToRender;

        dataToDisplay.forEach(spec => {
            const card = document.createElement('div');
            card.classList.add('spec-card', 'p-6', 'rounded-xl', 'shadow-md', 'hover:shadow-lg', 'transition-shadow', 'cursor-pointer');
            card.dataset.specPurpose = spec["Use of purposes"];

            let dimensions = spec["Recommended Dimensions (Pixels)"] || "N/A";
            let orientation = spec["Orientation"] && spec["Orientation"] !== "N/A" ? spec["Orientation"] + ", " : "";
            let aspectRatio = spec["Aspect Ratio"] && spec["Aspect Ratio"] !== "N/A" ? spec["Aspect Ratio"] + " aspect ratio" : "";
            let lastUpdated = spec["Last Updated Date"] || "N/A";

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
            const charLimitsHtml = charLimits.length > 0 ? `<p class="text-F3F3E0 text-xs mt-2 opacity-80">Text Limits: ${charLimits.join(' | ')}</p>` : '';

            card.innerHTML = `
                <h3 class="text-xl font-semibold text-DDA853 mb-2">${cardTitle}</h3>
                <p class="text-F3F3E0 text-sm mb-4 opacity-90">${orientation}${aspectRatio}</p>
                <p class="text-F3F3E0 font-bold">${dimensions}</p>
                ${charLimitsHtml}
                <p class="text-F3F3E0 text-xs mt-2 opacity-70">Last Updated: ${lastUpdated}</p>
            `;
            specCardsContainer.appendChild(card);

            card.addEventListener('click', () => {
                const purpose = encodeURIComponent(spec["Use of purposes"]);
                const dataType = currentData === digitalSpecsData ? 'digital' : 'offline';
                window.location.href = `detail.html?purpose=${purpose}&type=${dataType}`;
            });
        });

        // Show/hide "View All" button
        if (dataToRender.length > initialCardLimit && !showingAllCards) {
            viewAllButtonContainer.classList.remove('hidden');
        } else {
            viewAllButtonContainer.classList.add('hidden');
        }
    }

    // Event listener for "View All" button
    viewAllSpecsBtn.addEventListener('click', () => {
        showingAllCards = true;
        applyFilters(); // Re-render with all cards
    });

    // --- Filter Element References ---
    const searchInput = document.querySelector('.hero-section input[type="text"]');
    const searchButton = document.querySelector('.hero-section button');
    const platformSelect = document.getElementById('platform-select');
    const assetTypeSelect = document.getElementById('asset-type-select');
    const mediaTypeSelect = document.getElementById('media-type-select');
    const digitalToggleButton = document.getElementById('digital-toggle-btn'); // Using ID now
    const offlineToggleButton = document.getElementById('offline-toggle-btn'); // Using ID now

    // --- Populate Filter Dropdowns ---
    function populateFilterDropdown(selectElement, values) {
        selectElement.innerHTML = '<option value="">All</option>'; // Clear existing options
        values.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            selectElement.appendChild(option);
        });
    }

    // --- Extract unique platforms ---
    function getUniquePlatforms(data) {
        const platforms = new Set();
        data.forEach(item => {
            const purpose = item["Use of purposes"];
            if (purpose && purpose !== "N/A") {
                // Extract the main platform name (e.g., "Facebook", "Instagram", "YouTube", "TikTok", "LinkedIn")
                const platformMatch = purpose.match(/^(Facebook|Instagram|YouTube|TikTok|LinkedIn|Standard|A4 Flyer|Roll-up Banner|Outdoor Billboard|A5 Postcard)/); // Added offline categories
                if (platformMatch && platformMatch[1]) {
                    // For offline, use the full "Use of purposes" as the "platform" for simplicity in this context
                    if (item["Media Type"] === "Print") {
                        platforms.add(purpose.split(' (')[0]); // Take "Standard Business Card" from "Standard Business Card (3.5 x 2 inches at 300 DPI)"
                    } else {
                        platforms.add(platformMatch[1]);
                    }
                }
            }
        });
        return Array.from(platforms).sort();
    }

    // --- Extract unique asset types based on selected platform ---
    function getUniqueAssetTypes(data, selectedPlatform) {
        const assetTypes = new Set();
        data.forEach(item => {
            const purpose = item["Use of purposes"];
            if (purpose && purpose !== "N/A") {
                const platformMatch = purpose.match(/^(Facebook|Instagram|YouTube|TikTok|LinkedIn|Standard|A4 Flyer|Roll-up Banner|Outdoor Billboard|A5 Postcard)/); // Added offline categories
                let itemPlatform = '';

                if (item["Media Type"] === "Print") {
                    itemPlatform = purpose.split(' (')[0]; // For print, compare with the base name
                } else if (platformMatch && platformMatch[1]) {
                    itemPlatform = platformMatch[1];
                }

                if (selectedPlatform === "" || itemPlatform === selectedPlatform) {
                    assetTypes.add(purpose); // Add the full "Use of purposes" as an asset type
                }
            }
        });
        return Array.from(assetTypes).sort();
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

            // Platform filter: checks if 'Use of purposes' starts with the selected platform
            let specPlatform = '';
            if (spec["Media Type"] === "Print") {
                specPlatform = spec["Use of purposes"] ? spec["Use of purposes"].split(' (')[0].toLowerCase() : '';
            } else {
                const platformMatch = spec["Use of purposes"] ? spec["Use of purposes"].match(/^(Facebook|Instagram|YouTube|TikTok|LinkedIn)/) : null;
                specPlatform = platformMatch && platformMatch[1] ? platformMatch[1].toLowerCase() : '';
            }
            const matchesPlatform = selectedPlatform === "" || specPlatform === selectedPlatform;

            // Asset Type filter: exact match for 'Use of purposes'
            const matchesAssetType = selectedAssetType === "" ||
                                     (spec["Use of purposes"] && spec["Use of purposes"].toLowerCase() === selectedAssetType);

            // Media Type filter: exact match for 'Media Type'
            const matchesMediaType = selectedMediaType === "" ||
                                     (spec["Media Type"] && spec["Media Type"].toLowerCase() === selectedMediaType);

            return matchesSearch && matchesPlatform && matchesAssetType && matchesMediaType;
        });

        renderSpecCards(filteredData, initialCardLimit); // Always apply limit initially
    }

    // --- Event Listeners for Search and Filters ---
    searchButton.addEventListener('click', () => {
        showingAllCards = false; // Reset when new search/filter
        applyFilters();
    });
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            showingAllCards = false; // Reset when new search/filter
            applyFilters();
        }
    });

    platformSelect.addEventListener('change', () => {
        showingAllCards = false; // Reset when new search/filter
        const selectedPlatform = platformSelect.value;
        const assetTypes = getUniqueAssetTypes(currentData, selectedPlatform);
        populateFilterDropdown(assetTypeSelect, assetTypes);
        assetTypeSelect.value = ""; // Reset asset type when platform changes
        applyFilters(); // Apply filters after asset type dropdown is updated
    });

    assetTypeSelect.addEventListener('change', () => {
        showingAllCards = false; // Reset when new search/filter
        applyFilters();
    });
    mediaTypeSelect.addEventListener('change', () => {
        showingAllCards = false; // Reset when new search/filter
        applyFilters();
    });

    // --- Digital / Offline Toggle ---
    digitalToggleButton.addEventListener('click', () => {
        if (currentData === digitalSpecsData) return; // Prevent unnecessary re-render

        digitalToggleButton.classList.remove('bg-gray-200', 'text-gray-800');
        digitalToggleButton.classList.add('bg-DDA853', 'text-183B4E'); // Active colors
        offlineToggleButton.classList.remove('bg-DDA853', 'text-183B4E'); // Inactive colors
        offlineToggleButton.classList.add('bg-183B4E', 'text-F3F3E0');

        currentData = digitalSpecsData; // Set active data to digital
        showingAllCards = false; // Reset card view
        populateFilterDropdown(platformSelect, getUniquePlatforms(currentData));
        populateFilterDropdown(mediaTypeSelect, [...new Set(currentData.map(item => item["Media Type"]).filter(value => value && value !== "N/A"))].sort());
        populateFilterDropdown(assetTypeSelect, getUniqueAssetTypes(currentData, platformSelect.value)); // Repopulate asset types based on currently selected platform
        platformSelect.value = ""; // Reset platform filter
        assetTypeSelect.value = ""; // Reset asset type filter
        mediaTypeSelect.value = ""; // Reset media type filter
        searchInput.value = ""; // Clear search input
        applyFilters(); // Re-apply filters with new data source
    });

    offlineToggleButton.addEventListener('click', () => {
        if (currentData === offlineSpecsData) return; // Prevent unnecessary re-render

        offlineToggleButton.classList.remove('bg-gray-200', 'text-gray-800');
        offlineToggleButton.classList.add('bg-DDA853', 'text-183B4E'); // Active colors
        digitalToggleButton.classList.remove('bg-DDA853', 'text-183B4E'); // Inactive colors
        digitalToggleButton.classList.add('bg-183B4E', 'text-F3F3E0');

        currentData = offlineSpecsData; // Set active data to offline
        showingAllCards = false; // Reset card view
        if (currentData.length === 0) {
            specCardsContainer.innerHTML = '<p class="text-F3F3E0 text-center col-span-full py-8">Offline (Printing) specifications coming soon!</p>';
            viewAllButtonContainer.classList.add('hidden'); // Hide view all button
            // Clear and disable filter dropdowns for offline mode if no data
            platformSelect.innerHTML = '<option value="">All</option>';
            assetTypeSelect.innerHTML = '<option value="">All</option>';
            mediaTypeSelect.innerHTML = '<option value="">All</option>';
            // Optionally disable them
            // platformSelect.disabled = true;
            // assetTypeSelect.disabled = true;
            // mediaTypeSelect.disabled = true;
        } else {
            populateFilterDropdown(platformSelect, getUniquePlatforms(currentData));
            populateFilterDropdown(mediaTypeSelect, [...new Set(currentData.map(item => item["Media Type"]).filter(value => value && value !== "N/A"))].sort());
            populateFilterDropdown(assetTypeSelect, getUniqueAssetTypes(currentData, platformSelect.value)); // Repopulate asset types for offline data
            applyFilters(); // Re-apply filters with new data source
        }
        platformSelect.value = ""; // Reset platform filter
        assetTypeSelect.value = ""; // Reset asset type filter
        mediaTypeSelect.value = ""; // Reset media type filter
        searchInput.value = ""; // Clear search input
    });

    // --- Initial Data Fetch and Setup ---
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

        // Populate initial platform and media type dropdowns
        populateFilterDropdown(platformSelect, getUniquePlatforms(currentData));
        populateFilterDropdown(mediaTypeSelect, [...new Set(currentData.map(item => item["Media Type"]).filter(value => value && value !== "N/A"))].sort());
        // Populate initial asset type dropdown based on "All" platform
        populateFilterDropdown(assetTypeSelect, getUniqueAssetTypes(currentData, platformSelect.value));

        renderSpecCards(currentData, initialCardLimit); // Initial render with limit
    })
    .catch(error => {
        console.error('Error fetching specifications:', error);
        specCardsContainer.innerHTML = '<p class="text-red-600 text-center col-span-full py-8">Failed to load specifications. Please ensure `digital_specs.json` and `offline_specs.json` exist in the root directory.</p>';
        viewAllButtonContainer.classList.add('hidden'); // Hide view all button on error
    });

    // --- Feedback Modal Logic ---
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

    // --- Header Navigation Logic ---
    const navDigitalSpecs = document.getElementById('nav-digital-specs');
    const navOfflineSpecs = document.getElementById('nav-offline-specs');

    if (navDigitalSpecs) {
        navDigitalSpecs.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            digitalToggleButton.click(); // Simulate click on digital toggle
        });
    }

    if (navOfflineSpecs) {
        navOfflineSpecs.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            offlineToggleButton.click(); // Simulate click on offline toggle
        });
    }
});
