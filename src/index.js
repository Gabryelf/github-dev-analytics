// Простая версия без React для начала
console.log('GitHub Dev Analytics is loading...');

document.addEventListener('DOMContentLoaded', function() {
    const app = document.getElementById('root');
    app.innerHTML = `
        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
            <h1>🚀 GitHub Dev Analytics</h1>
            <p>Your GitHub activity tracker is being built!</p>
            <div style="background: #f0f0f0; padding: 20px; border-radius: 10px; max-width: 400px; margin: 20px auto;">
                <h3>Coming Soon Features:</h3>
                <ul style="text-align: left;">
                    <li>📊 Commit statistics</li>
                    <li>🎯 Issue tracking</li>
                    <li>📈 Activity charts</li>
                    <li>🏆 Achievement system</li>
                </ul>
            </div>
            <p>Follow progress on <a href="https://github.com/$GITHUB_REPOSITORY">GitHub</a></p>
        </div>
    `;
});
