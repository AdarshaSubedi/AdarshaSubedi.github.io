profileUrl = 'https://api.github.com/users/AdarshaSubedi';

profile = (data) => {
    const followersCount = data['followers'];
    const followersInformation = `I have been followed by ${followersCount} people on GitHub`
    document.getElementById('profileImage').src = data['avatar_url'];
    document.getElementById('profileName').textContent = data['name'];
    document.getElementById('followersInfo').textContent = followersInformation;
    document.getElementById('bio').textContent = data['bio'];
    document.getElementById('githubLink').href = data['html_url'];

}

repoDiv = (repo) => {
    const projects = document.getElementById('projects');

    repoLink = document.createElement('a');
    repoLink.href = repo.html_url
    repoLink.target = '_blank';
    projects.appendChild(repoLink);

    const repoContainer = document.createElement('div');
    repoContainer.classList = 'repo-container';
    repoLink.appendChild(repoContainer);

    const projectName = document.createElement('h3');
    projectName.textContent = repo.name;
    repoContainer.appendChild(projectName);

    if (repo.description !== null) {
        const projectDesc = document.createElement('p');
        projectDesc.classList = 'project-description';
        projectDesc.textContent = repo.description;
        repoContainer.appendChild(projectDesc);
    }
    if (repo.language !== null) {
        const language = document.createElement('p');
        language.classList = 'language';
        language.textContent = repo.language;
        repoContainer.appendChild(language);
    }

}

hidePreloader = () => {
    document.getElementById('mainContainer').hidden = false;
    document.getElementById('loadingContainer').hidden = true;
}

fetch(profileUrl)
    .then(res => res.json())
    .then(data => {
        profile(data);
        fetch(data.repos_url)
            .then(res => res.json())
            .then(data => {
                data.forEach(repo => {
                    repoDiv(repo);
                });
                setTimeout(() => {
                    hidePreloader();
                }, 1000)
            });
    });