(function () {
    const search = document.getElementById("search");
    const profile = document.getElementById("profile");
    const url = "https://api.github.com/users";
    const client_id = "211c496486119f1cc2a6"
    const client_secret = "372d6b8364a8b0d460b29eef1215b47c097c93bc"
    const count = 5;
    const sort = "created: asc";
    const progling = "language=c%23";
    

    async function getUser(user) {
        const profileResponse = await fetch(
            `${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`);

        const reposResponse = await fetch(
            `${url}/${user}/repos?per_page=${count}&sort=${sort}&language=${progling}&client_id=${client_id}&client_secret=${client_secret}`);

        const profile = await profileResponse.json();
        const repos = await reposResponse.json();

        return {
            profile,
            repos
        };
    }

    function showProfile(user) {
        console.log(user);
        profile.innerHTML = `<div class="row mt-3">
    <div class="col-md-4">
        <div class="card" style="width: auto;">
            <img class="card-img-top" src="${user.avatar_url}">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Repositórios: <span class="badge badge-primary">${user.public_repos}</span></li>
                <li class="list-group-item">Seguidores: <span class="badge badge-success">${user.followers}</span></li>
                <li class="list-group-item">Seguindo: <span class="badge badge-danger">${user.following}</span></li>
            </ul>
            <div class="card-body">
                <a href="${user.html_url}" target="_blank" class="btn btn-warning btn-block">Ver perfil</a>
        </div>
    </div>
</div>
<div class="col-md-8">
<div id="repos"></div>
</div>
</div>`
    }

    function showRepos(repos) {
        let output = "";

        repos.forEach(repo => {
            output += `
            <div class="card card-body mb-2">
        <div class="row">
            <div class="col-md-6"><a href="${repo.html_url}" target="_black">${repo.name}</a></div>
            <div class="col-md-6">
                <span class="badge badge-secondary">Stars: ${repo.stargazers_count}</span></span>
                <span class="badge badge-success">Watch: ${repo.watchers_count}</span>
                <span class="badge badge-info">Forks: ${repo.forks_count}</span>
            </div>
        </div>
    </div>`
        })

        document.getElementById("repos").innerHTML = output;

    }

    search.addEventListener("keyup", (e) => {
        const user = e.target.value;

        if (user.length > 0) {
            getUser(user).then(res => {
                showProfile(res.profile);
                showRepos(res.repos);
            })
        }
    });
})();