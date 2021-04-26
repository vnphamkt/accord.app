import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LogService } from 'src/app/services/log.service';
import { UsersService } from 'src/app/services/users.service';
import { WSService } from 'src/app/services/ws.service';
import { patterns } from 'src/app/types/entity-types';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent {
  public addFriendForm = new FormGroup({
    username: new FormControl('', [      
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(32),
      Validators.pattern(patterns.username),
    ])
  });

  constructor(
    public dialogRef: MatDialogRef<AddFriendComponent>,
    private log: LogService,
    private ws: WSService,
  ) {}

  public async sendFriendRequest() {
    if (this.addFriendForm.invalid) return;

    try {
      await this.ws.emitAsync('ADD_FRIEND', {
        username: this.addFriendForm.value.username,
      }, this);
      await this.log.success();
      await this.dialogRef.close();
    } catch (error) {
      await this.log.error(error.message);
    }
  }
}
