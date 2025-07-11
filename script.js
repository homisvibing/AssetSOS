// JavaScript for Mobile Navigation Menu, Data Loading, Search, and Filtering

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

    // --- Digital Asset Specification Data ---
    // This data is directly embedded for simplicity in this environment.
    // In a real application, you might fetch this from a JSON file or API.
    const digitalSpecsData = [
        {
            "Use of purposes": "Facebook Profile Photo",
            "Media Type": "Image",
            "Orientation": "Square",
            "Recommended Dimensions (Pixels)": "180 x 180 (displays)",
            "Min Dimensions (Pixels)": "180 x 180",
            "Max Dimensions (Pixels)": "2048 x 2048",
            "Aspect Ratio": "1:1",
            "Minimum File Size": "N/A",
            "Maximum File Size": "N/A",
            "Recommended File Resolution": "Upload 2048 x 2048 for best quality",
            "Recommended File Formats": "JPG, PNG",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "N/A",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Displays at 180x180px on computers and 128x128px on smartphones; Thumbnail at 40x40px; Appears circular; Use a high-quality image; Keep design simple; Avoid text if possible.",
            "Last Updated Date": "April 7, 2025",
            "The exact source URL": "https://www.owox.com/blog/articles/all-facebook-photo-sizes"
        },
        {
            "Use of purposes": "Facebook Personal Cover Photo",
            "Media Type": "Image",
            "Orientation": "Horizontal",
            "Recommended Dimensions (Pixels)": "851 x 315 (min)",
            "Min Dimensions (Pixels)": "851 x 315",
            "Max Dimensions (Pixels)": "2037 x 754",
            "Aspect Ratio": "2.7:1",
            "Minimum File Size": "N/A",
            "Maximum File Size": "100 KB (recommended JPG)",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "JPG, PNG",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "N/A",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Displays at 820x312px on computers and 640x360px on smartphones; Design for 820x360px with a mobile safe zone of 640x312px; Profile picture covers bottom left.",
            "Last Updated Date": "January 2, 2025",
            "The exact source URL": "https://snappa.com/blog/facebook-cover-photo-size/"
        },
        {
            "Use of purposes": "Facebook Business Page Cover Photo",
            "Media Type": "Image",
            "Orientation": "Horizontal",
            "Recommended Dimensions (Pixels)": "1958 x 745",
            "Min Dimensions (Pixels)": "399 x 150",
            "Max Dimensions (Pixels)": "1958 x 745",
            "Aspect Ratio": "2.63:1",
            "Minimum File Size": "N/A",
            "Maximum File Size": "N/A",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "JPG, PNG",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "N/A",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Mobile safe area: 640x312px.",
            "Last Updated Date": "April 7, 2025",
            "The exact source URL": "https://www.owox.com/blog/articles/all-facebook-photo-sizes"
        },
        {
            "Use of purposes": "Facebook Group Cover Photo",
            "Media Type": "Image",
            "Orientation": "Horizontal",
            "Recommended Dimensions (Pixels)": "1640 x 922",
            "Min Dimensions (Pixels)": "820 x 461",
            "Max Dimensions (Pixels)": "1640 x 922",
            "Aspect Ratio": "1.78:1",
            "Minimum File Size": "N/A",
            "Maximum File Size": "N/A",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "JPG, PNG",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "N/A",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Recommended for desktop display. Keep key elements within the mobile-safe zone.",
            "Last Updated Date": "April 7, 2025",
            "The exact source URL": "https://www.owox.com/blog/articles/all-facebook-photo-sizes"
        },
        {
            "Use of purposes": "Facebook Event Header Image",
            "Media Type": "Image",
            "Orientation": "Horizontal",
            "Recommended Dimensions (Pixels)": "1920 x 1080 (best quality)",
            "Min Dimensions (Pixels)": "1200 x 628",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "2:1",
            "Minimum File Size": "N/A",
            "Maximum File Size": "N/A",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "JPG, PNG",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "N/A",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Recommended 1200x628px for general use.",
            "Last Updated Date": "April 7, 2025",
            "The exact source URL": "https://www.owox.com/blog/articles/all-facebook-photo-sizes"
        },
        {
            "Use of purposes": "Facebook Feed Photo",
            "Media Type": "Image",
            "Orientation": "Any",
            "Recommended Dimensions (Pixels)": "1080 x 1080 (Square)",
            "Min Dimensions (Pixels)": "600 x 600",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "1:1, 1.91:1, 4:5",
            "Minimum File Size": "N/A",
            "Maximum File Size": "30 MB",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "JPG, PNG",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "125",
            "Max Characters - Headline": "27",
            "Max Characters - Description": "27",
            "Max Characters - CTA": "N/A",
            "Important notes": "Recommended aspect ratios: 1.91:1 to 1:1 for horizontal images, 4:5 for vertical images. File size up to 30 MB for PNG and JPG. Primary text may be truncated after 125 chars, headline/link description after 27 chars.",
            "Last Updated Date": "April 19, 2024",
            "The exact source URL": "https://madgicx.com/blog/when-it-comes-to-facebook-ads-size-matters"
        },
        {
            "Use of purposes": "Facebook Feed Video",
            "Media Type": "Video",
            "Orientation": "Any",
            "Recommended Dimensions (Pixels)": "1080 x 1080 (Square)",
            "Min Dimensions (Pixels)": "600 x 315",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "1:1, 16:9, 4:5",
            "Minimum File Size": "N/A",
            "Maximum File Size": "4 GB",
            "Recommended File Resolution": "1080p or higher",
            "Recommended File Formats": "MP4, MOV, GIF",
            "Video Length Limits (if applicable)": "1 second - 241 minutes",
            "Max Characters - Primary Text/Body": "125",
            "Max Characters - Headline": "27",
            "Max Characters - Description": "27",
            "Max Characters - CTA": "N/A",
            "Important notes": "H.264 compression, fixed frame rate, square pixels, progressive scan, stereo AAC audio at 128 kbps+; Recommended bit rate: 30Mbps; Recommended frame rate: 30fps or 60fps; Videos must have at least 600px in width; Thumbnail image recommended. Primary text may be truncated after 125 chars, headline/link description after 27 chars.",
            "Last Updated Date": "June 9, 2025",
            "The exact source URL": "https://sproutsocial.com/insights/social-media-video-specs-guide/#facebook"
        },
        {
            "Use of purposes": "Facebook Stories (Image)",
            "Media Type": "Image",
            "Orientation": "Vertical",
            "Recommended Dimensions (Pixels)": "1080 x 1920",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "9:16",
            "Minimum File Size": "N/A",
            "Maximum File Size": "30 MB",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "JPG, PNG",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "125",
            "Max Characters - Headline": "40",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Ensure key elements are within the safe zone (1080x1420px center). Primary text may be truncated after 125 chars, headline after 40 chars.",
            "Last Updated Date": "September 12, 2024",
            "The exact source URL": "https://www.rakacreative.com/blog/digital-advertising/ad-character-limits-an-always-up-to-date-guide"
        },
        {
            "Use of purposes": "Facebook Stories (Video)",
            "Media Type": "Video",
            "Orientation": "Vertical",
            "Recommended Dimensions (Pixels)": "1080 x 1920",
            "Min Dimensions (Pixels)": "500 px (width)",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "9:16",
            "Minimum File Size": "N/A",
            "Maximum File Size": "4 GB",
            "Recommended File Resolution": "1080p or higher",
            "Recommended File Formats": "MP4, MOV, GIF",
            "Video Length Limits (if applicable)": "1 second - 2 minutes",
            "Max Characters - Primary Text/Body": "125",
            "Max Characters - Headline": "40",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "H.264 compression, fixed frame rate, square pixels, progressive scan, stereo AAC audio at 128 kbps+; Videos will be cropped to 9:16 if not already in that ratio; No text polling, emojis, etc. in video ads. Primary text may be truncated after 125 chars, headline after 40 chars.",
            "Last Updated Date": "June 9, 2025",
            "The exact source URL": "https://sproutsocial.com/insights/social-media-video-specs-guide/#facebook"
        },
        {
            "Use of purposes": "Facebook Reels",
            "Media Type": "Video",
            "Orientation": "Vertical",
            "Recommended Dimensions (Pixels)": "1080 x 1920",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "9:16",
            "Minimum File Size": "N/A",
            "Maximum File Size": "4 GB",
            "Recommended File Resolution": "1080p or higher",
            "Recommended File Formats": "MP4, MOV, GIF",
            "Video Length Limits (if applicable)": "No maximum limit",
            "Max Characters - Primary Text/Body": "72",
            "Max Characters - Headline": "10",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Recommended frame rate: 30fps or 60fps; Video aspect ratios supported: 1.91 to 9:16; Thumbnail image recommended. Primary text may be truncated after 72 chars, headline after 10 chars.",
            "Last Updated Date": "June 9, 2025",
            "The exact source URL": "https://sproutsocial.com/insights/social-media-video-specs-guide/#facebook"
        },
        {
            "Use of purposes": "Facebook Carousel Ads (Image)",
            "Media Type": "Image",
            "Orientation": "Square",
            "Recommended Dimensions (Pixels)": "1080 x 1080",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "1:1",
            "Minimum File Size": "N/A",
            "Maximum File Size": "30 MB",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "JPG, PNG",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "125",
            "Max Characters - Headline": "40",
            "Max Characters - Description": "20",
            "Max Characters - CTA": "N/A",
            "Important notes": "Minimum 2 cards, maximum 10 cards. Primary text may be truncated after 125 chars, headline after 40 chars, link description after 20 chars.",
            "Last Updated Date": "September 12, 2024",
            "The exact source URL": "https://www.rakacreative.com/blog/digital-advertising/ad-character-limits-an-always-up-to-date-guide"
        },
        {
            "Use of purposes": "Facebook Carousel Ads (Video)",
            "Media Type": "Video",
            "Orientation": "Various",
            "Recommended Dimensions (Pixels)": "N/A",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "Various",
            "Minimum File Size": "N/A",
            "Maximum File Size": "4 GB",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "MP4, MOV, GIF",
            "Video Length Limits (if applicable)": "Up to 240 minutes",
            "Max Characters - Primary Text/Body": "125",
            "Max Characters - Headline": "40",
            "Max Characters - Description": "20",
            "Max Characters - CTA": "N/A",
            "Important notes": "Recommended duration: 15 seconds; H.264 video compression, square pixels, fixed frame rate, progressive scan; Audio: Stereo AAC audio compression, 128 kbps. Primary text may be truncated after 125 chars, headline after 40 chars, link description after 20 chars.",
            "Last Updated Date": "September 12, 2024",
            "The exact source URL": "https://www.rakacreative.com/blog/digital-advertising/ad-character-limits-an-always-up-to-date-guide"
        },
        {
            "Use of purposes": "Facebook Organic Post",
            "Media Type": "Text",
            "Orientation": "N/A",
            "Recommended Dimensions (Pixels)": "N/A",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "N/A",
            "Minimum File Size": "N/A",
            "Maximum File Size": "N/A",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "N/A",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "63206",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Ideal length for engagement is 1-80 characters.",
            "Last Updated Date": "June 21, 2022",
            "The exact source URL": "https://blog.hootsuite.com/ideal-social-media-post-length/"
        },
        {
            "Use of purposes": "Facebook Comment",
            "Media Type": "Text",
            "Orientation": "N/A",
            "Recommended Dimensions (Pixels)": "N/A",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "N/A",
            "Minimum File Size": "N/A",
            "Maximum File Size": "N/A",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "N/A",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "8000",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "N/A",
            "Last Updated Date": "N/A",
            "The exact source URL": "https://nuelink.com/tools/facebook-character-counter"
        },
        {
            "Use of purposes": "Instagram Profile Picture",
            "Media Type": "Image",
            "Orientation": "Square",
            "Recommended Dimensions (Pixels)": "320 x 320 (displays)",
            "Min Dimensions (Pixels)": "320 x 320",
            "Max Dimensions (Pixels)": "1000 x 1000",
            "Aspect Ratio": "1:1",
            "Minimum File Size": "N/A",
            "Maximum File Size": "N/A",
            "Recommended File Resolution": "Upload 1000 x 1000 for high quality",
            "Recommended File Formats": "JPG, PNG",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "N/A",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Displays at 320x320px; Appears circular; Simple designs work best; Account for circular crop.",
            "Last Updated Date": "November 4, 2024",
            "The exact source URL": "https://snappa.com/blog/instagram-profile-picture-size/"
        },
        {
            "Use of purposes": "Instagram In-Feed Photo (Square)",
            "Media Type": "Image",
            "Orientation": "Square",
            "Recommended Dimensions (Pixels)": "1080 x 1080",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "1:1",
            "Minimum File Size": "N/A",
            "Maximum File Size": "30 MB",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "JPG, PNG",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "125",
            "Max Characters - Headline": "40",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "For square images. Primary text may be truncated after 125 chars, headline after 40 chars. Max 30 hashtags.",
            "Last Updated Date": "April 11, 2025",
            "The exact source URL": "https://www.wordstream.com/blog/instagram-ad-copy"
        },
        {
            "Use of purposes": "Instagram In-Feed Photo (Landscape)",
            "Media Type": "Image",
            "Orientation": "Horizontal",
            "Recommended Dimensions (Pixels)": "1080 x 566",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "1.91:1",
            "Minimum File Size": "N/A",
            "Maximum File Size": "30 MB",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "JPG, PNG",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "125",
            "Max Characters - Headline": "40",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "For landscape images. Primary text may be truncated after 125 chars, headline after 40 chars. Max 30 hashtags.",
            "Last Updated Date": "April 11, 2025",
            "The exact source URL": "https://www.wordstream.com/blog/instagram-ad-copy"
        },
        {
            "Use of purposes": "Instagram In-Feed Photo (Vertical)",
            "Media Type": "Image",
            "Orientation": "Vertical",
            "Recommended Dimensions (Pixels)": "1080 x 1350",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "4:5",
            "Minimum File Size": "N/A",
            "Maximum File Size": "30 MB",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "JPG, PNG",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "125",
            "Max Characters - Headline": "40",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "For portrait images. Primary text may be truncated after 125 chars, headline after 40 chars. Max 30 hashtags.",
            "Last Updated Date": "April 11, 2025",
            "The exact source URL": "https://www.wordstream.com/blog/instagram-ad-copy"
        },
        {
            "Use of purposes": "Instagram In-Feed Video",
            "Media Type": "Video",
            "Orientation": "Any",
            "Recommended Dimensions (Pixels)": "1080 x 1080 (Square)",
            "Min Dimensions (Pixels)": "600 x 315",
            "Max Dimensions (Pixels)": "1936 x 1936",
            "Aspect Ratio": "1:1, 1.91:1, 4:5",
            "Minimum File Size": "N/A",
            "Maximum File Size": "4 GB",
            "Recommended File Resolution": "1080p or higher",
            "Recommended File Formats": "MP4, MOV, GIF",
            "Video Length Limits (if applicable)": "1 second - 60 minutes",
            "Max Characters - Primary Text/Body": "125",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Recommended bit rate: 30Mbps; Recommended frame rate: 30fps or 60fps. Primary text may be truncated after 125 chars. Max 30 hashtags.",
            "Last Updated Date": "April 11, 2025",
            "The exact source URL": "https://www.wordstream.com/blog/instagram-ad-copy"
        },
        {
            "Use of purposes": "Instagram Stories (Image)",
            "Media Type": "Image",
            "Orientation": "Vertical",
            "Recommended Dimensions (Pixels)": "1080 x 1920",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "9:16",
            "Minimum File Size": "N/A",
            "Maximum File Size": "30 MB",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "JPG, PNG",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "125",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Keep 250px top/bottom free of text/logos. Primary text may be truncated after 125 chars.",
            "Last Updated Date": "April 11, 2025",
            "The exact source URL": "https://www.wordstream.com/blog/instagram-ad-copy"
        },
        {
            "Use of purposes": "Instagram Stories (Video)",
            "Media Type": "Video",
            "Orientation": "Vertical",
            "Recommended Dimensions (Pixels)": "1080 x 1920",
            "Min Dimensions (Pixels)": "500 px (width)",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "9:16",
            "Minimum File Size": "N/A",
            "Maximum File Size": "4 GB",
            "Recommended File Resolution": "1080p or higher",
            "Recommended File Formats": "MP4, MOV, GIF",
            "Video Length Limits (if applicable)": "1 second - 15 seconds",
            "Max Characters - Primary Text/Body": "125",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Videos will be cropped to 9:16 if not already in that ratio. Primary text may be truncated after 125 chars.",
            "Last Updated Date": "April 11, 2025",
            "The exact source URL": "https://www.wordstream.com/blog/instagram-ad-copy"
        },
        {
            "Use of purposes": "Instagram Reels",
            "Media Type": "Video",
            "Orientation": "Vertical",
            "Recommended Dimensions (Pixels)": "1080 x 1920",
            "Min Dimensions (Pixels)": "500 px (width)",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "9:16",
            "Minimum File Size": "N/A",
            "Maximum File Size": "4 GB",
            "Recommended File Resolution": "At least 500 x 888 px",
            "Recommended File Formats": "MP4, MOV, GIF",
            "Video Length Limits (if applicable)": "1 second - 15 minutes",
            "Max Characters - Primary Text/Body": "72",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Recommended frame rate: 30fps or 60fps; Video aspect ratios supported: 1.91 to 9:16; Thumbnail image recommended; Aspect Ratio Tolerance: 1%. Primary text may be truncated after 72 chars.",
            "Last Updated Date": "April 11, 2025",
            "The exact source URL": "https://www.wordstream.com/blog/instagram-ad-copy"
        },
        {
            "Use of purposes": "Instagram Carousel Ads (Image)",
            "Media Type": "Image",
            "Orientation": "Square",
            "Recommended Dimensions (Pixels)": "1080 x 1080",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "1:1",
            "Minimum File Size": "N/A",
            "Maximum File Size": "30 MB",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "JPG, PNG",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "125",
            "Max Characters - Headline": "40",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Minimum 2 cards, maximum 10 cards. Primary text may be truncated after 125 chars, headline after 40 chars. Max 30 hashtags.",
            "Last Updated Date": "April 11, 2025",
            "The exact source URL": "https://www.wordstream.com/blog/instagram-ad-copy"
        },
        {
            "Use of purposes": "Instagram Carousel Ads (Video)",
            "Media Type": "Video",
            "Orientation": "Various",
            "Recommended Dimensions (Pixels)": "N/A",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "Various",
            "Minimum File Size": "N/A",
            "Maximum File Size": "4 GB",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "MP4, MOV, GIF",
            "Video Length Limits (if applicable)": "Up to 60 minutes",
            "Max Characters - Primary Text/Body": "125",
            "Max Characters - Headline": "40",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Recommended duration: 15 seconds; Videos automatically play when a user swipes through carousel cards, sound is off by default. Primary text may be truncated after 125 chars, headline after 40 chars. Max 30 hashtags.",
            "Last Updated Date": "April 11, 2025",
            "The exact source URL": "https://www.wordstream.com/blog/instagram-ad-copy"
        },
        {
            "Use of purposes": "Instagram Organic Post (Caption)",
            "Media Type": "Text",
            "Orientation": "N/A",
            "Recommended Dimensions (Pixels)": "N/A",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "N/A",
            "Minimum File Size": "N/A",
            "Maximum File Size": "N/A",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "N/A",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "2200",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Only the first 125 characters appear before truncation. Max 30 hashtags.",
            "Last Updated Date": "April 23, 2025",
            "The exact source URL": "https://www.sendible.com/insights/instagram-character-limit"
        },
        {
            "Use of purposes": "Instagram Comment",
            "Media Type": "Text",
            "Orientation": "N/A",
            "Recommended Dimensions (Pixels)": "N/A",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "N/A",
            "Minimum File Size": "N/A",
            "Maximum File Size": "N/A",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "N/A",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "2200",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "N/A",
            "Last Updated Date": "April 23, 2025",
            "The exact source URL": "https://www.sendible.com/insights/instagram-character-limit"
        },
        {
            "Use of purposes": "YouTube Profile Picture (Channel Icon)",
            "Media Type": "Image",
            "Orientation": "Square",
            "Recommended Dimensions (Pixels)": "800 x 800",
            "Min Dimensions (Pixels)": "800 x 800",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "1:1",
            "Minimum File Size": "N/A",
            "Maximum File Size": "6 MB",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "JPG, PNG, BMP, GIF (no animated)",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "N/A",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Displays as a circle. Account for circular crop. Max file size: 6 MB.",
            "Last Updated Date": "November 18, 2024",
            "The exact source URL": "https://snappa.com/blog/youtube-profile-picture-size/"
        },
        {
            "Use of purposes": "YouTube Banner (Channel Art)",
            "Media Type": "Image",
            "Orientation": "Any",
            "Recommended Dimensions (Pixels)": "2560 x 1440",
            "Min Dimensions (Pixels)": "2048 x 1152",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "16:9",
            "Minimum File Size": "N/A",
            "Maximum File Size": "6 MB",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "JPG, PNG, BMP, GIF (no animated)",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "N/A",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Minimum image safe area for text and logos: 1546 x 423 pixels. This ensures visibility across desktop, mobile, and TV.",
            "Last Updated Date": "January 2, 2025",
            "The exact source URL": "https://snappa.com/blog/youtube-channel-art-size/"
        },
        {
            "Use of purposes": "YouTube Standard Video",
            "Media Type": "Video",
            "Orientation": "Horizontal",
            "Recommended Dimensions (Pixels)": "1920 x 1080 (HD)",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "16:9",
            "Minimum File Size": "N/A",
            "Maximum File Size": "256 GB or 12 hours (whichever is less)",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "MP4 (recommended), MOV, MPEG4, AVI, WMV, MPEGPS, FLV, 3GPP, WebM, DNxHR, ProRes, CineForm, HEVC (h265)",
            "Video Length Limits (if applicable)": "Up to 12 hours (default)",
            "Max Characters - Primary Text/Body": "N/A",
            "Max Characters - Headline": "100",
            "Max Characters - Description": "70",
            "Max Characters - CTA": "N/A",
            "Important notes": "Also supports 4:3 and 1:1, but 16:9 is standard. Frame rates: 24, 25, 30, 48, 50, 60 fps (preferred progressive scan). For in-feed video ads: headline 100 chars (shortens after 25), description up to 2 lines, 35 chars each.",
            "Last Updated Date": "January 5, 2025",
            "The exact source URL": "https://www.creatopy.com/blog/youtube-ad-sizes/"
        },
        {
            "Use of purposes": "YouTube Shorts",
            "Media Type": "Video",
            "Orientation": "Vertical",
            "Recommended Dimensions (Pixels)": "1080 x 1920",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "9:16",
            "Minimum File Size": "N/A",
            "Maximum File Size": "N/A",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "MP4 (recommended)",
            "Video Length Limits (if applicable)": "15 seconds - 60 seconds",
            "Max Characters - Primary Text/Body": "N/A",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "YouTube Shorts are vertical videos. Add #Shorts in description.",
            "Last Updated Date": "N/A",
            "The exact source URL": "https://strikesocial.com/blog/youtube-ad-specifications/"
        },
        {
            "Use of purposes": "YouTube In-Feed Video Ad",
            "Media Type": "Video",
            "Orientation": "Any",
            "Recommended Dimensions (Pixels)": "1280 x 720 (horizontal)",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "16:9, 1:1, 9:16",
            "Minimum File Size": "N/A",
            "Maximum File Size": "256 GB",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "MP4, MOV, WMV, AVI",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "N/A",
            "Max Characters - Headline": "100",
            "Max Characters - Description": "70",
            "Max Characters - CTA": "N/A",
            "Important notes": "Headline: 100 characters max (may shorten after 25). Description: Up to 2 lines, 35 characters max per line. Thumbnail required.",
            "Last Updated Date": "N/A",
            "The exact source URL": "https://support.google.com/google-ads/answer/6227733?hl=en"
        },
        {
            "Use of purposes": "YouTube Bumper Ad",
            "Media Type": "Video",
            "Orientation": "Any",
            "Recommended Dimensions (Pixels)": "N/A",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "N/A",
            "Minimum File Size": "N/A",
            "Maximum File Size": "N/A",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "N/A",
            "Video Length Limits (if applicable)": "6 seconds",
            "Max Characters - Primary Text/Body": "N/A",
            "Max Characters - Headline": "90",
            "Max Characters - Description": "90",
            "Max Characters - CTA": "10",
            "Important notes": "Non-skippable video ad up to 6 seconds. Long headline: 90 chars. Description: 90 chars (up to 5 lines). CTA: 10 chars.",
            "Last Updated Date": "N/A",
            "The exact source URL": "https://strikesocial.com/blog/youtube-ad-specifications/"
        },
        {
            "Use of purposes": "YouTube Organic Post (Description)",
            "Media Type": "Text",
            "Orientation": "N/A",
            "Recommended Dimensions (Pixels)": "N/A",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "N/A",
            "Minimum File Size": "N/A",
            "Maximum File Size": "N/A",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "N/A",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "5000",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "N/A",
            "Last Updated Date": "October 18, 2023",
            "The exact source URL": "https://support.google.com/youtube/answer/12948449?hl=en#:~:text=The%20description%20allows%20a%20maximum,stand%20out%20from%20similar%20videos."
        },
        {
            "Use of purposes": "YouTube Comment",
            "Media Type": "Text",
            "Orientation": "N/A",
            "Recommended Dimensions (Pixels)": "N/A",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "N/A",
            "Minimum File Size": "N/A",
            "Maximum File Size": "N/A",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "N/A",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "10000",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "N/A",
            "Last Updated Date": "June 9, 2022",
            "The exact source URL": "https://charactercounter.com/youtube"
        },
        {
            "Use of purposes": "TikTok Profile Picture",
            "Media Type": "Image",
            "Orientation": "Square",
            "Recommended Dimensions (Pixels)": "200 x 200",
            "Min Dimensions (Pixels)": "20 x 20",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "1:1",
            "Minimum File Size": "N/A",
            "Maximum File Size": "50 KB",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "JPG, PNG, GIF",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "N/A",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Displays as a circle. Minimum size 20x20px. Upload larger for flexibility when cropping.",
            "Last Updated Date": "July 23, 2024",
            "The exact source URL": "https://www.shopify.com/blog/tiktok-pfp"
        },
        {
            "Use of purposes": "TikTok In-Feed Video",
            "Media Type": "Video",
            "Orientation": "Any",
            "Recommended Dimensions (Pixels)": "1080 x 1920 (Vertical)",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "9:16, 1:1, 16:9",
            "Minimum File Size": "N/A",
            "Maximum File Size": "500 MB",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "MP4, MOV",
            "Video Length Limits (if applicable)": "3 seconds - 10 minutes",
            "Max Characters - Primary Text/Body": "100",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Full screen (9:16) video is recommended. Ad description: 1-100 Latin chars (1-50 Asian chars); no emojis. App name: 4-40 Latin (2-20 Asian); Brand name: 2-20 Latin (1-10 Asian).",
            "Last Updated Date": "N/A",
            "The exact source URL": "https://soona.co/image-resizer/tiktok-image-size-specs"
        },
        {
            "Use of purposes": "TikTok Organic Post (Video Description/Caption)",
            "Media Type": "Text",
            "Orientation": "N/A",
            "Recommended Dimensions (Pixels)": "N/A",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "N/A",
            "Minimum File Size": "N/A",
            "Maximum File Size": "N/A",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "N/A",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "2200",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "N/A",
            "Last Updated Date": "December 17, 2022",
            "The exact source URL": "https://charactercounter.com/tiktok#:~:text=The%20TikTok%20description%20character%20limit%20is%202200%20characters&text=This%20is%20the%20same%20character,specific%20and%20detailed%20as%20possible."
        },
        {
            "Use of purposes": "TikTok Comment",
            "Media Type": "Text",
            "Orientation": "N/A",
            "Recommended Dimensions (Pixels)": "N/A",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "N/A",
            "Minimum File Size": "N/A",
            "Maximum File Size": "N/A",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "N/A",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "150",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "N/A",
            "Last Updated Date": "December 17, 2022",
            "The exact source URL": "https://charactercounter.com/tiktok#:~:text=The%20TikTok%20comment%20character%20limit%20is%20150%20characters&text=Remember%20to%20stay%20within%20the%20150%20character%20limit."
        },
        {
            "Use of purposes": "LinkedIn Personal Profile Photo",
            "Media Type": "Image",
            "Orientation": "Square",
            "Recommended Dimensions (Pixels)": "400 x 400",
            "Min Dimensions (Pixels)": "200 x 200",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "1:1",
            "Minimum File Size": "N/A",
            "Maximum File Size": "8 MB",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "JPG, PNG",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "N/A",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Displays as a circle. High-quality image recommended for professionalism. Max file size: 8 MB.",
            "Last Updated Date": "January 29, 2025",
            "The exact source URL": "https://www.dreikon.de/en/news/social-media/linkedin-image-sizes/"
        },
        {
            "Use of purposes": "LinkedIn Personal Profile Banner (Cover)",
            "Media Type": "Image",
            "Orientation": "Horizontal",
            "Recommended Dimensions (Pixels)": "1584 x 396",
            "Min Dimensions (Pixels)": "1192 x 220",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "4:1",
            "Minimum File Size": "N/A",
            "Maximum File Size": "8 MB",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "JPG, PNG",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "N/A",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Keep main design elements in the middle/right due to profile photo overlap. Safe zone: 1350 x 220 pixels.",
            "Last Updated Date": "November 6, 2024",
            "The exact source URL": "https://snappa.com/blog/linkedin-banner-size/"
        },
        {
            "Use of purposes": "LinkedIn Company Page Profile Photo (Logo)",
            "Media Type": "Image",
            "Orientation": "Square",
            "Recommended Dimensions (Pixels)": "300 x 300",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "1:1",
            "Minimum File Size": "N/A",
            "Maximum File Size": "N/A",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "JPG, PNG",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "N/A",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Usually contains company logo. Displays square.",
            "Last Updated Date": "January 29, 2025",
            "The exact source URL": "https://www.dreikon.de/en/news/social-media/linkedin-image-sizes/"
        },
        {
            "Use of purposes": "LinkedIn Company Page Cover Photo (Banner)",
            "Media Type": "Image",
            "Orientation": "Horizontal",
            "Recommended Dimensions (Pixels)": "1128 x 191",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "N/A",
            "Minimum File Size": "N/A",
            "Maximum File Size": "8 MB",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "JPG, PNG",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "N/A",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Displayed at the top of the company page, partially covered by the profile photo.",
            "Last Updated Date": "September 1, 2023",
            "The exact source URL": "https://www.dochipo.com/linkedin-banner-size/"
        },
        {
            "Use of purposes": "LinkedIn Single Image Post",
            "Media Type": "Image",
            "Orientation": "Any",
            "Recommended Dimensions (Pixels)": "1200 x 627 (horizontal)",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "1.91:1, 1:1, 4:5",
            "Minimum File Size": "N/A",
            "Maximum File Size": "5 MB",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "JPG, PNG, GIF",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "600",
            "Max Characters - Headline": "200",
            "Max Characters - Description": "300",
            "Max Characters - CTA": "N/A",
            "Important notes": "Recommended for horizontal: 1200 x 627px. For square: 1200 x 1200px. For vertical: 1080 x 1350px. Max file size: 5MB for images. Use sRGB color profile. Introductory text: up to 600 chars (150 recommended to avoid truncation). Headline: 200 chars (70 recommended). Description: 300 chars (100 recommended).",
            "Last Updated Date": "N/A",
            "The exact source URL": "https://www.ntg-digital.com/Digital-Information/LinkedIn-Ad-Specifications"
        },
        {
            "Use of purposes": "LinkedIn Video Post",
            "Media Type": "Video",
            "Orientation": "Any",
            "Recommended Dimensions (Pixels)": "1920 x 1080 (horizontal)",
            "Min Dimensions (Pixels)": "256 x 144",
            "Max Dimensions (Pixels)": "4096 x 2304",
            "Aspect Ratio": "16:9, 1:1, 9:16",
            "Minimum File Size": "N/A",
            "Maximum File Size": "5 GB",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "MP4, MOV, ASF",
            "Video Length Limits (if applicable)": "3 seconds - 10 minutes",
            "Max Characters - Primary Text/Body": "600",
            "Max Characters - Headline": "200",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Frame rates from 10 to 60 fps. Bit rates from 192 kbps (audio) to 30 Mbps (video). Audio: AAC or MPEG4. Video: H.264. Vertical video supported but generally displayed cropped in feed. Introductory text: up to 600 chars. Headline: 200 chars (70 recommended).",
            "Last Updated Date": "N/A",
            "The exact source URL": "https://www.ntg-digital.com/Digital-Information/LinkedIn-Ad-Specifications"
        },
        {
            "Use of purposes": "LinkedIn Carousel Ad (Image)",
            "Media Type": "Image",
            "Orientation": "Square",
            "Recommended Dimensions (Pixels)": "1080 x 1080",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "1:1",
            "Minimum File Size": "N/A",
            "Maximum File Size": "10 MB per card",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "JPG, PNG",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "255",
            "Max Characters - Headline": "45",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Minimum 2 cards, maximum 10 cards. Max file size: 10MB per image. Introductory text: 255 chars (150 recommended). Headline: 45 chars for landing page CTA, 30 chars for Lead Gen Form CTA.",
            "Last Updated Date": "N/A",
            "The exact source URL": "https://www.veuno.com/linkedin-ad-specs-your-guide-for-2025/"
        },
        {
            "Use of purposes": "LinkedIn Document Ads",
            "Media Type": "Document",
            "Orientation": "Any",
            "Recommended Dimensions (Pixels)": "N/A",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "N/A",
            "Minimum File Size": "N/A",
            "Maximum File Size": "100 MB",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "PDF, DOC, DOCX, PPT, PPTX",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "N/A",
            "Max Characters - Headline": "N/A",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "PDFs are recommended. Max file size 100MB. Up to 300 pages. Keep text concise. Introductory text: 600 chars (150 recommended).",
            "Last Updated Date": "N/A",
            "The exact source URL": "https://business.linkedin.com/marketing-solutions/ad-specs/document-ads"
        },
        {
            "Use of purposes": "LinkedIn Text Ad",
            "Media Type": "Text",
            "Orientation": "N/A",
            "Recommended Dimensions (Pixels)": "N/A",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "N/A",
            "Minimum File Size": "N/A",
            "Maximum File Size": "N/A",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "N/A",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "75",
            "Max Characters - Headline": "25",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "N/A",
            "Important notes": "Text Ads can appear in various sizes (e.g., 300x250, 728x90). Headline: 25 chars max, no truncation. Description: 75 chars max. Desktop only display. Introductory text: 150 chars (600 max).",
            "Last Updated Date": "N/A",
            "The exact source URL": "https://www.veuno.com/linkedin-ad-specs-your-guide-for-2025/"
        },
        {
            "Use of purposes": "LinkedIn Message Ad",
            "Media Type": "Text",
            "Orientation": "N/A",
            "Recommended Dimensions (Pixels)": "N/A",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "N/A",
            "Minimum File Size": "N/A",
            "Maximum File Size": "N/A",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "N/A",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "N/A",
            "Max Characters - Headline": "60",
            "Max Characters - Description": "N/A",
            "Max Characters - CTA": "20",
            "Important notes": "Message subject: 60 chars max. CTA button copy: 20 chars max. No character limits for body message, but keep concise. Optional banner creative: 300x250px.",
            "Last Updated Date": "N/A",
            "The exact source URL": "https://magicbrief.com/post/all-linkedin-ads-sizes-in-2023-explained"
        },
        {
            "Use of purposes": "LinkedIn Follower Ad",
            "Media Type": "Text",
            "Orientation": "N/A",
            "Recommended Dimensions (Pixels)": "N/A",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "N/A",
            "Minimum File Size": "N/A",
            "Maximum File Size": "N/A",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "N/A",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "N/A",
            "Max Characters - Headline": "50",
            "Max Characters - Description": "70",
            "Max Characters - CTA": "N/A",
            "Important notes": "Ad headline: 50 chars max. Ad description: 70 chars max. Company name: 25 chars max (appears on hover over logo). Usually combined with a company logo (100x100px).",
            "Last Updated Date": "N/A",
            "The exact source URL": "https://magicbrief.com/post/all-linkedin-ads-sizes-in-2023-explained"
        },
        {
            "Use of purposes": "LinkedIn Spotlight Ad",
            "Media Type": "Text",
            "Orientation": "N/A",
            "Recommended Dimensions (Pixels)": "N/A",
            "Min Dimensions (Pixels)": "N/A",
            "Max Dimensions (Pixels)": "N/A",
            "Aspect Ratio": "N/A",
            "Minimum File Size": "N/A",
            "Maximum File Size": "N/A",
            "Recommended File Resolution": "N/A",
            "Recommended File Formats": "N/A",
            "Video Length Limits (if applicable)": "N/A",
            "Max Characters - Primary Text/Body": "N/A",
            "Max Characters - Headline": "50",
            "Max Characters - Description": "70",
            "Max Characters - CTA": "N/A",
            "Important notes": "Ad headline: 50 chars max. Ad description (above images): 70 chars max. Often includes images/videos from other sections. Best for driving website visits or job applications.",
            "Last Updated Date": "N/A",
            "The exact source URL": "https://magicbrief.com/post/all-linkedin-ads-sizes-in-2023-explained"
        }
    ];

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
            let mediaType = spec["Media Type"] || "N/A";

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

    let currentData = digitalSpecsData; // Keep track of the currently active dataset (digital/offline)

    // --- Populate Filter Dropdowns ---
    function populateFilterDropdown(selectElement, data, key) {
        // Clear existing options, keep the default "Select..." option
        selectElement.innerHTML = '<option value="">All</option>';
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

            const matchesPlatform = selectedPlatform === "" ||
                                    (spec["Use of purposes"] && spec["Use of purposes"].toLowerCase().includes(selectedPlatform));

            const matchesAssetType = selectedAssetType === "" ||
                                     (spec["Use of purposes"] && spec["Use of purposes"].toLowerCase().includes(selectedAssetType));

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
        populateFilterDropdown(platformSelect, currentData, "Use of purposes"); // Repopulate platform based on digital data
        populateFilterDropdown(mediaTypeSelect, currentData, "Media Type"); // Repopulate media type based on digital data
        // Note: Asset Type is often derived from "Use of purposes" and can be complex.
        // For now, it's populated with all unique "Use of purposes" as well.
        populateFilterDropdown(assetTypeSelect, currentData, "Use of purposes"); // Populate asset type (simple for now)

        applyFilters(); // Re-apply filters with new data source
    });

    offlineToggleButton.addEventListener('click', () => {
        offlineToggleButton.classList.remove('bg-gray-200', 'text-gray-800');
        offlineToggleButton.classList.add('bg-blue-600', 'text-white');
        digitalToggleButton.classList.remove('bg-blue-600', 'text-white');
        digitalToggleButton.classList.add('bg-gray-200', 'text-gray-800');

        // Placeholder for offline data
        currentData = []; // No offline data yet
        specCardsContainer.innerHTML = '<p class="text-gray-600 text-center col-span-full py-8">Offline (Printing) specifications coming soon!</p>';

        // Clear and disable filter dropdowns for offline mode if no data
        platformSelect.innerHTML = '<option value="">All</option>';
        assetTypeSelect.innerHTML = '<option value="">All</option>';
        mediaTypeSelect.innerHTML = '<option value="">All</option>';
        // You might want to disable them:
        // platformSelect.disabled = true;
        // assetTypeSelect.disabled = true;
        // mediaTypeSelect.disabled = true;
    });

    // --- Initial setup on page load ---
    populateFilterDropdown(platformSelect, digitalSpecsData, "Use of purposes");
    populateFilterDropdown(mediaTypeSelect, digitalSpecsData, "Media Type");
    // For simplicity, populate assetTypeSelect with "Use of purposes" for now.
    // A more advanced implementation would dynamically populate this based on platformSelect.
    populateFilterDropdown(assetTypeSelect, digitalSpecsData, "Use of purposes");

    // Initial render of all digital specs
    renderSpecCards(digitalSpecsData);
});
