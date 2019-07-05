import { Component, OnInit} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {



  ngOnInit() {
  }


  fileData: File = null;
  constructor(private http: HttpClient) { }

  fileProgress(fileInput: any) {
      this.fileData = <File>fileInput.target.files[0];
  }

  onSubmit() {
      const formData = new FormData();
      formData.append('file', this.fileData);
      this.http.post('url/to/your/api', formData)
        .subscribe(res => {
          console.log(res);
          alert('SUCCESS !!');
        })
  }

}
