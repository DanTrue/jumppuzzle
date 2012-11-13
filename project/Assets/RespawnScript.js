#pragma strict

var respawnHeight = -50;
public var lastCheckpoint = Vector3(0, 0, 0);

function Start () {

}

function Update () {
    var y_pos = transform.position.y;
    //print(y_pos);
    if (y_pos < respawnHeight) {
        transform.position = lastCheckpoint;
    }
}