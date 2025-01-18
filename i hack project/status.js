window.onload = function () {
    // Get the complaint ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const complaintId = urlParams.get('complaintId');

    // Complaint Details and Status
    const complaintDetails = document.getElementById('complaint-details');
    const statusSpan = document.getElementById('status');
    const statusIndicator = document.getElementById('status-indicator');
    const proceedBtn = document.getElementById('proceed-btn');
    const popup = document.getElementById('popup');
    const markSolvedBtn = document.getElementById('mark-solved');
    const markUnsolvedBtn = document.getElementById('mark-unsolved');

    // Retrieve complaint data from localStorage
    const complaintData = JSON.parse(localStorage.getItem(complaintId));

    if (complaintData) {
        // Populate complaint details
        document.getElementById('complainant-username').textContent = complaintData.username;
        document.getElementById('complainant-game-username').textContent = complaintData['game-username'];
        document.getElementById('game-name').textContent = complaintData['game-name'];
        document.getElementById('developer-name').textContent = complaintData['developer-name'];
        document.getElementById('complaint-category').textContent = complaintData.category;
        document.getElementById('complaint-description').textContent = complaintData.description;

        // Set the current status and visual indicator
        const currentStatus = complaintData.status || 'Unresolved';
        statusSpan.textContent = currentStatus;
        if (currentStatus === 'Solved') {
            statusIndicator.classList.add('solved');
            statusIndicator.classList.remove('unresolved');
            statusIndicator.innerHTML = '<p>Solved</p>';
            proceedBtn.style.display = 'none';
        } else {
            statusIndicator.classList.add('unresolved');
            statusIndicator.classList.remove('solved');
            statusIndicator.innerHTML = '<p>Unresolved</p>';
        }

        // Proceed button click event
        proceedBtn.onclick = function () {
            popup.style.display = 'block';
        };

        // Mark as solved
        markSolvedBtn.onclick = function () {
            statusSpan.textContent = 'Solved';
            statusIndicator.classList.add('solved');
            statusIndicator.classList.remove('unresolved');
            statusIndicator.innerHTML = '<p>Solved</p>';
            popup.style.display = 'none';
            alert("You have confirmed that the problem is solved.");
        };

        // Mark as unresolved
        markUnsolvedBtn.onclick = function () {
            statusSpan.textContent = 'Unresolved';
            statusIndicator.classList.add('unresolved');
            statusIndicator.classList.remove('solved');
            statusIndicator.innerHTML = '<p>Unresolved</p>';
            popup.style.display = 'none';
            alert("The problem is still unresolved.");
        };
    } else {
        complaintDetails.innerHTML = "<p>Complaint not found.</p>";
    }
};
