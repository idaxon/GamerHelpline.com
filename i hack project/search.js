// Sample Data for Complaints
const complaints = [
    {
        username: "User1",
        game: "Game A",
        developer: "Dev A",
        problem: "Harassment during gameplay.",
        likes: 30,
        proof: "assets/complaint1.jpg", // Image URL or video
        status: "unresolved",
        datePosted: "2025-01-10"
    },
    {
        username: "User2",
        game: "Game B",
        developer: "Dev B",
        problem: "In-game purchases not processing.",
        likes: 50,
        proof: "assets/complaint2.jpg", // Image URL or video
        status: "resolved",
        datePosted: "2025-01-12"
    },
    {
        username: "User3",
        game: "Game C",
        developer: "Dev C",
        problem: "Addiction due to game mechanics.",
        likes: 15,
        proof: "assets/complaint3.jpg", // Image URL or video
        status: "unresolved",
        datePosted: "2025-01-14"
    }
];

// Function to generate complaint items
function generateComplaints() {
    const complaintsList = document.getElementById("complaints-list");
    complaintsList.innerHTML = ''; // Clear previous complaints

    complaints.forEach(complaint => {
        const complaintItem = document.createElement("li");
        complaintItem.classList.add("complaint-item");

        complaintItem.innerHTML = `
            <h3>${complaint.game} - ${complaint.problem}</h3>
            <p><strong>Developer:</strong> ${complaint.developer}</p>
            <p><strong>Posted by:</strong> ${complaint.username}</p>
            <p><strong>Date Posted:</strong> ${complaint.datePosted}</p>
            <div class="tags">
                <span>${complaint.status === 'resolved' ? 'Resolved' : 'Unresolved'}</span>
            </div>
            <div class="proof">
                <img src="${complaint.proof}" alt="Complaint Proof">
            </div>
            <div>
                <strong>Likes:</strong> ${complaint.likes}
            </div>
            <div class="${complaint.status === 'resolved' ? 'resolved' : 'unresolved'}">
                ${complaint.status === 'resolved' ? 'Resolved' : 'Unresolved'}
            </div>
        `;

        complaintsList.appendChild(complaintItem);
    });
}

// Function to sort complaints
function sortComplaints() {
    const sortBy = document.getElementById('sort-by').value;

    if (sortBy === 'date') {
        complaints.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
    } else if (sortBy === 'likes') {
        complaints.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === 'status') {
        complaints.sort((a, b) => {
            if (a.status === 'resolved' && b.status === 'unresolved') return 1;
            if (a.status === 'unresolved' && b.status === 'resolved') return -1;
            return 0;
        });
    }

    generateComplaints(); // Re-render sorted complaints
}

// Call the function to generate complaints when the page loads
window.onload = generateComplaints;
