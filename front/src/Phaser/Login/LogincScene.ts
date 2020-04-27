import KeyboardKeydownCallback = Phaser.Types.Input.Keyboard.KeyboardKeydownCallback;
import {gameManager} from "../Game/GameManager";
import {ROOM} from "../../Enum/EnvironmentVariable";
import {TextField} from "../Components/TextField";
import {TextInput} from "../Components/TextInput";
import {ClickButton} from "../Components/ClickButton";
import {cypressAsserter} from "../../Cypress/CypressAsserter";

//todo: put this constants in a dedicated file
export const LoginSceneName = "LoginScene";
enum LoginTextures {
    playButton = "play_button",
}

export class LogincScene extends Phaser.Scene {
    private emailInput: TextInput;
    private textField: TextField;
    private playButton: ClickButton;
    private infoTextField: TextField;
    constructor() {
        super({
            key: LoginSceneName
        });
    }
    
    preload() {
        cypressAsserter.reachedLoginScene(this);
        this.load.image(LoginTextures.playButton, "resources/objects/play_button.png");
    }
    
    create() {
        this.textField = new TextField(this, 10, 10, 'Enter your email:');
        this.emailInput = new TextInput(this, 10, 50);

        let x = this.game.renderer.width / 2;
        let y = this.game.renderer.height / 2;
        this.playButton = new ClickButton(this, x, y, LoginTextures.playButton, this.login.bind(this));

        let infoText = "Commandes de base: \n - Z,Q,S,D (ou les flèches de direction) pour bouger\n - SHIFT pour accélerer";
        this.infoTextField = new TextField(this, 10, 300, infoText);
    }
    
    update(time: number, delta: number): void {
        
    }
    
    login() {
        let email = this.emailInput.text;
        if (!email) return;
        return this.loginFromEmail(email);
    }
    
    async loginFromEmail(email: string): Promise<void> {
        await gameManager.connect(email);
        this.scene.start("GameScene");
    }  
}