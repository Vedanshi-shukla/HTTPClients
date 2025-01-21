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




















// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
//   standalone: false,
// })
// export class AppComponent implements OnInit {
//   posts: any[] = []; // Stores the list of posts
//   newPost = { title: '', body: '' }; // Model for the new post form

//   private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // API endpoint

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.fetchPosts(); // Fetch posts on component initialization
//   }

//   // Fetch posts from the API
//   fetchPosts(): void {
//     this.http.get<any[]>(this.apiUrl).subscribe((data) => {
//       this.posts = data.slice(0, 10); // Limit to 10 posts for simplicity
//     });
//   }

//   // Add a new post
//   addPost(): void {
//     console.log(this.newPost.body);
//     if (this.newPost.title && this.newPost.body) {
//       console.log('Adding post:', this.newPost);
//       this.http.post<any>(this.apiUrl, this.newPost).subscribe(
//         (post) => {
//           console.log('Post created:', post); // Debugging log
//           this.posts.unshift(post); // Add the new post to the beginning of the list
//           this.newPost = { title: '', body: '' }; // Clear the form
//         },
//         (error) => {
//           console.error('Error creating post:', error); // Log any errors
//         }
//       );
//     } else {
//       console.warn('Title and body are required to add a post.'); // Log if title or body is empty
//     }
//   }

//   // Delete a post
//   deletePost(id: number): void {
//     this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
//       this.posts = this.posts.filter((post) => post.id !== id); // Remove the deleted post from the list
//     });
//   }
// }
