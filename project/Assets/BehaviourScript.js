#pragma strict

var respawnHeight = -50;
var lastCheckpoint = Vector3(0, 0, 0);
var respawnActivateDistance = 5;
var foundRespawnRecently = false;
var fanfare : ParticleSystem;
var playerTorch : GameObject;

function Start() {
    playerTorch.light.enabled = false;
}

function Update () {
    // check for distance to respawn:
    var respawnPoint = FindClosestRespawn();
    if (respawnPoint != null) {
        lastCheckpoint = respawnPoint.transform.position;
        if(!foundRespawnRecently) {
            foundRespawnRecently = true;
            fanfare.Play();
            // Then stop
        }
    }else{
        if(foundRespawnRecently) {
            foundRespawnRecently = false;
        }
    }

    // Check for bottom of level 
    var y_pos = transform.position.y;
    //print(y_pos);
    if (y_pos < respawnHeight) {
        transform.position = lastCheckpoint;
    }

    // Check if light is turned on
    if (Input.GetKeyDown("l")){ // and L pressed...
      playerTorch.light.enabled = !playerTorch.light.enabled; // toggle light
    }
}

// Find the name of the closest enemy
function FindClosestRespawn () : GameObject {
    // Find all game objects with tag Enemy
    var gos : GameObject[];
    gos = GameObject.FindGameObjectsWithTag("Respawn"); 
    var closest : GameObject; 
    var distance = Mathf.Infinity;
    var position = transform.position;
    // Iterate through them and find the closest one
    for (var go : GameObject in gos)  { 
        var diff = (go.transform.position - position);
        var curDistance = diff.sqrMagnitude; 
        if (curDistance < distance) { 
            closest = go; 
            distance = curDistance; 
        } 
    }

    if (distance < respawnActivateDistance) {
        return closest;    
    }else{
        return null;
    }

}