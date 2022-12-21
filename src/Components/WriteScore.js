const DataStore = ''
const ScoreTracker = ''

// writes the user score, bot score, and username to the databaset
export default async function writeScore(username, score, botScore) {
    try {
        await DataStore.save(
            new ScoreTracker({
                "score": score,
                "botScore": botScore,
                "user": username
            })
        )    
        console.log("Post saved successfully!");
    } catch (error) {
      console.log("Error saving post", error);
    }
}

// updates the score and botscore for hte given user by deleting the score and re-writing with the
// original score plus 1 for whoever won (user vs bot), since direct updates are not allowed
export async function updateScore(username, score, botScore) {
    try {
        const curData = await DataStore.query(ScoreTracker)
        const curScore = curData.filter(i => i.user === username)
        await DataStore.delete(ScoreTracker, (score) => score.user.eq(username));
        writeScore(username, curScore[0].score+score, curScore[0].botScore+botScore)   
    }
    catch (error) {
        console.log("Error saving post", error);
      }
}

// gets the score data for the given user
export async function getScore(username) {
    try {
        const curData = await DataStore.query(ScoreTracker)
        const curScore = curData.filter(i => i.user === username)
        return curScore[0]   
    }
    catch (error) {
        console.log("Error getting data", error);
      }
}

