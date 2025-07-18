
const form=document.getElementById("githubForm");
const input=document.getElementById("userNameInput");
const resultDiv=document.getElementById("result");


form.addEventListener("submit",async function (e) {
    e.preventDefault();

    const username = input.value.trim();
    if(!username) return;
    resultDiv.innerHTML="Fetching...";

    try{
        const res=await fetch(`http://localhost:5000/api/github/${username}`);
        if(!res.ok) throw new console.error(("User Not found or server error"));
        
        const data=await res.json();

        resultDiv.innerHTML = `
  <h4>GitHub stats for <strong>${username}</strong></h4>

  <p><strong>Public Repositories:</strong> ${data.public_repos}</p>
  <p><strong>Followers:</strong> ${data.followers}</p>
  <p><strong>Total Stars:</strong> ${data.total_stars}</p>
  <p><strong>Top Language:</strong> ${data.top_language || "N/A"}</p>
  <p><strong>Most Starred Repo:</strong> 
  <a href="${data.most_starred_repo.url}" target="_blank">
    ${data.most_starred_repo.name}
  </a>
</p>
  <p><strong>Languages Used:</strong> ${
    Array.isArray(data.languages_used)
      ? data.languages_used.join(", ")
      : "N/A"
  }</p>
`;

    }
    catch(e){
        console.log("Error in Script.js Function Handling");
        resultDiv.innerHTML=`<p style="color:red:"> Error </p>`;
    }
})