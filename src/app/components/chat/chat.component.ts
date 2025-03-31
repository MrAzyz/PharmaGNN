import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./chat.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this line

})
export class ChatComponent {
  messages: Array<{text: string, isUser: boolean}> = [
    { text: "Hello! How can I help you today?", isUser: false }
  ];
  userInput = '';
  isLoading = false;
  errorMessage = '';

  constructor(private chatService: ChatService) {}

  sendMessage() {
    if (!this.userInput.trim() || this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = '';

    // Add user message immediately
    this.messages.push({ text: this.userInput, isUser: true });

    this.chatService.sendMessage(this.userInput).subscribe({
      next: (response: any) => {
        this.messages.push({
          text: response?.response || "Received an empty response",
          isUser: false
        });
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Failed to get response';
        this.messages.push({
          text: this.errorMessage,
          isUser: false
        });
      },
      complete: () => {
        this.isLoading = false;
        this.userInput = '';
      }
    });
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      this.sendMessage();
    }
  }
}
