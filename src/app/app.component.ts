import { Component , OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    posts:any[]=[];                       // array to store posts from api
    newPost={title: '',body:''};          //object to store form data

    private apiUrl='https://jsonplaceholder.typicode.com/posts';

    constructor(private http:HttpClient){}

    ngOnInit(): void {
        this.fetchPosts();          // calls this method to load posts from api
    }

    //GET:
    fetchPosts():void{
      this.http.get<any[]>(this.apiUrl).subscribe((data) => {         //fetchs posts from api using GET req
        this.posts = data.slice(0, 5);
      });
    }

    //POST:
    addPost(): void {
      console.log(this.newPost);
      if (this.newPost.title && this.newPost.body) {
        this.http.post(this.apiUrl, this.newPost).subscribe((post) => {
          console.log(post);
          this.posts.unshift(post); // adds the new post to the start of the array
          this.newPost = { title: '', body: '' }; // Clear the form
        });
      }
    }
    
    //DELETE:
    deletePost(id: number): void {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
        this.posts = this.posts.filter((post) => post.id !== id);
      });
    }
  }
