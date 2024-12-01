const images = [
    "COBRA_EXC70_50CC_MANUAL_GEARBOX_21.jpg",
    "HONDA_TRX450_HONDA_CRF150R_20.jpg",
    "HONDA_TRX450_HUSQVARNA_FC450_0.jpeg",
    "HONDA_TRX450_HUSQVARNA_FC450_1.png",
    "HONDA_TRX450_HUSQVARNA_FC450_9.jpg",
    "HONDA_TRX450_KTM_SX250F_18.JPG",
    "HONDA_TRX450_KTM_SX450F_2.JPG",
    "HONDA_TRX450_KTM_SX450F_3.jpg",
    "HONDA_TRX450_KTM_SX450F_3N.jpg",
    "HONDA_TRX450_KTM_SX450F_5.png",
    "HONDA_TRX450_KTM_SX450F_13.jpg",
    "HONDA_TRX450_KTM_SX450F_16.jpg",
    "HONDA_TRX450_KTM_SX450F_17.JPG",
    "HONDA_TRX450_TM530_19.jpg",
    "KTM_SX505ATV_HUSQVARNA_FC450_7.jpg",
    "KTM_SX505ATV_KTM_SX450F_12.jpeg",
    "KTM_SX505ATV_KTM_SX450F_15.JPG",
    "SUZUKI_LTR450_HONDA_CRF150R_4.png",
    "SUZUKI_LTR450_KTM_SX450F_10.jpg",
    "SUZUKI_LTR450_KTM_SX450F_11.JPG",
    "YAMAHA_YFZ450_KTM_SX250F_14.jpeg",
    "YAMAHA_YFZ450R_HUSQVARNA_FX450_6.png"
];


// Reference to the container where the builds will be appended
const container = document.getElementById("build-container");

images.forEach(path => {
    // Create a div container for the build
    const buildHtml = document.createElement('div');
    buildHtml.classList.add('flex-container');

    // Split the filename by underscores and extension
    const name = path.split('.')[0];  // Get the filename without the extension
    const nameParts = name.split('_'); // Split by underscore

    // Extract the first part (first two words)
    const frame = `${nameParts[0]} ${nameParts[1]}`;
    // Extract the second part (remaining parts of the filename)
    const engine = nameParts.slice(2).join(' ');

    // Set the inner HTML using a template literal, with two h3 tags for the parts
    buildHtml.innerHTML = `
        <img
            src="../images/builds/${path}"
            alt="${frame} build"
        />
        <div>
            <h3>${frame}</h3>
            <h3>${engine}</h3>
        </div>
    `;

    // Append the built HTML to the container
    container.appendChild(buildHtml);
});