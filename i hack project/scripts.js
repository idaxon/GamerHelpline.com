// Mock Data for Top Reports with Real Games and Developers
const topReports = [
    {
        username: "User1",
        game: "The Witcher 3: Wild Hunt",
        developer: "CD Projekt Red",
        category: "Harassment",
        description: "Player was harassed during gameplay.",
        tags: ["Important", "Urgent"]
    },
    {
        username: "User2",
        game: "Cyberpunk 2077",
        developer: "CD Projekt Red",
        category: "Fraud",
        description: "In-game purchases not being processed.",
        tags: ["Urgent"]
    },
    {
        username: "User3",
        game: "Minecraft",
        developer: "Mojang Studios",
        category: "Addiction",
        description: "Player reports excessive addiction levels.",
        tags: ["Important"]
    },
    {
        username: "User4",
        game: "Fortnite",
        developer: "Epic Games",
        category: "Fraud",
        description: "In-game currency was stolen.",
        tags: ["Important", "Urgent"]
    },
    {
        username: "User5",
        game: "Valorant",
        developer: "Riot Games",
        category: "Harassment",
        description: "Toxic behavior and verbal abuse from players.",
        tags: ["Important"]
    },
    {
        username: "User6",
        game: "League of Legends",
        developer: "Riot Games",
        category: "Addiction",
        description: "Player reports unhealthy gaming behavior and time spent.",
        tags: ["Urgent"]
    }
];

// Function to display reports in a golden highlighted manner
function displayTopReports() {
    const reportsContainer = document.getElementById('top-reports-list');
    
    // Clear any previous content
    reportsContainer.innerHTML = '';

    topReports.forEach((report, index) => {
        const reportElement = document.createElement('div');
        reportElement.classList.add('report');

        // Add golden highlight for the first few reports (top reports)
        if (index < 3) {
            reportElement.classList.add('golden-highlight');
        }

        reportElement.innerHTML = `
            <h3>${report.game} (${report.developer})</h3>
            <p><strong>Category:</strong> ${report.category}</p>
            <p><strong>Description:</strong> ${report.description}</p>
            <p><strong>Reported by:</strong> ${report.username}</p>
            <p><strong>Tags:</strong> ${report.tags.join(', ')}</p>
        `;

        reportsContainer.appendChild(reportElement);
    });
}

// Call function to display top reports when the page loads
window.onload = displayTopReports;


// Function to generate top reports dynamically
function generateTopReports() {
    const reportListContainer = document.getElementById("top-reports-list");

    topReports.forEach(report => {
        const reportItem = document.createElement("div");
        reportItem.classList.add("report-item");
        
        reportItem.innerHTML = `
            <h3>${report.game} - ${report.category}</h3>
            <p><strong>${report.username}</strong> reported:</p>
            <p>${report.description}</p>
            <div class="tags">
                ${report.tags.map(tag => `<span>${tag}</span>`).join('')}
            </div>
        `;

        reportListContainer.appendChild(reportItem);
    });
}

// Call the function to generate top reports when the page loads
window.onload = generateTopReports;

function handleFormSubmit(event) {
    event.preventDefault();

    // Gather form data
    const form = document.getElementById('complaint-form');
    const formData = new FormData(form);
    const complaintData = {};

    formData.forEach((value, key) => {
        complaintData[key] = value;
    });

    // Store complaint data in localStorage (for simplicity, we use localStorage here)
    const complaintId = 'complaint-' + new Date().getTime();  // Generate unique complaint ID
    localStorage.setItem(complaintId, JSON.stringify(complaintData));

    // Redirect to complaint status page with complaint ID
    window.location.href = `complaint-status.html?complaintId=${complaintId}`;
}
