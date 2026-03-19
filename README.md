# Project description
This is a repository that holds the code for my personal website for my dev portfolio (to try get hired UGH) as well as a blog for thoughts and updates on projects. As of now I'm using `Next.js`, In conjunction with `React` (Which i think is necessary). 

---

# Blog

### 19/03/2026 | Using AI. and details.
I was watching a [fireship video](https://www.youtube.com/watch?v=Xn-gtHDsaPY) and he mentions that the CEO of [Replit](https://replit.com/) thinks knowing how to code is a disadvantage. Implying that getting engrossed in the details distracts from productivity- specially when rather than taking the time to understand, you can just produce. Specially in regards to this website, I could've built it easily with AI but that would defeat the purpose. However, industry leaders- like the aforementioned Replit CEO- imply that they prefer the efficiency to understanding. Because thats how you sell (I think). But understanding gives way to creativity (imo).

Well onto how I used AI for this project; I am now going to always give coding a go before consulting AI. When it comes to direction I will present my ideas to AI (unless I know for sure that they'll work). And now, after asking AI for a review on my file structure, I will reorganise things in accordance.

### 18/03/2026 | Understanding SVGR and trying not to 'black box'
I admit it... the way I stubbornly try to always understand the process of things really is an inconvenience. It's the reason why-- even though I was immensely excited to learn webdev at uni-- I never got into it. There was too much 'magic' going on. We would learn about html, css, js, and http, then we'd skip a few steps and end up using some magical 'framework' shenanigans to make a website in 'react' because it was the modern standard. I understood none of it, and thats why I was stagnant in learning it, and i'm thats also the case with why some people would not get to learning about it too. Maybe I was subconsciously icked by what I didn't understand... wow philosophical... I guess I could work on that... 

Anywhooo, as soon as I had identified that as a mental road block, I leveraged AI to help explain how the technology got to this point. I kinda get the gist of the historical progression towards why I am using next js for my project but I still am blackboxing a LOT of the processes that happen under the hood (and I suppose thats fine because I likely never will fully understand the whole process). This came about because I started questioning why I had to install certain plugins to use `@svgr/core` (namely:  `@svgr/plugin-jsx` and `@svgr/plugin-svgo`), 

I noticed I've kinda been just copy pasting code without really giving it a go myself for this part and so I'll tell the AI with future prompts to not give the code out-right (unless prompted to), but instead to give the pseudo-code (explaining each step along the way) as well as information about any changes (or additions) that need to be made to the file structure of the project. (oh yeah a lil prompt engineering geared towards learning)

Onto what I'm actually going to do about it... I was taught (by AI ofc), about how using a **'CLI-driven generation pattern'**. It takes place at the 'build-time' of the application (or something) through the use of a script we make that uses the `@svgr/core` package to generate tsx components from our corresponding SVGs. I just imported the code provided, tried to understand it, and so now it prob doesn't work (i haven't tested). I'll work more on this next time.

### 16/03/2026 | SVGs and links to socials
I've had trouble getting the SVGs working and so I asked AI for help, prompting for a report comparing several approaches on using SVGs with react and tailwind. It resulted in the following table, recommending the use of SVGR. The thing is, the last time I tried to set up SVGR with my project I ran into some trouble. Something about next.js no longer using webpack... I'll give it another go though because I understand that setting up tools and configuration is an important part of developing.

Method|Type Safety|Perf (JS Size)|Styling Depth|Learning Curve
|---|---|---|---|---|
Registry|High|Low|High|Easy
SVGR|High|Medium|High|Medium
Sprites|Low|High|Low|Medium
Framer|High|Low|Highest|Hard

*Update:* Yea it doesn't work because my version of next `Next.js version: 16.1.6 (Turbopack)` uses turbopack (as shown) instead of webpack. When I prompted for fixes it suggested I:
* probably have to use a less 'cutting edge' version of Next,
* **or** use a svg library like `lucide-react` (Which contain the icons that ted uses for his [website](https://tedawf.com/)), 
* **or** just manually convert it (or use the SVGR CLI tool),
* **or** use `@svgr/core` package which is _apparently_ compatible with turbo pack.

And so I was looking at the documentation for setting up with `npm i @svgr/core` *but* I can't find anything of use for starting from scratch. What the literal helly. WHY AM I GETTING STUCK ON IMPORTING ICONS ARRGHH.


### 09/03/2026 | One tiny step
Got the animation part done for my name aaand I'm not completely satisfied with it. It works... it's just *sigh* not as cool as I thought it'd be. But I did learn heaps about useEffect and how it interacts with timeouts/timers which is nice. 

I also started working on putting in some links to things. So far I have put in links to my LinkedIn and GitHub, and I want to also have a 'get in contact', and a 'download resume'. But as of now things still look ass. Today I downloaded a package "`SVGR`" for displaying SVGs in react (as suggested by AI), however I got stuck on how to import it into my project and just gave up and uninstalled it. *SIGH*

I've also established my main inspirations as this dude [Ted's website](https://tedawf.com/) from the [Anthony Sistilli Video](https://youtu.be/4xqNp6IVXPM) and this cracked teen [Jason Cameron's website](https://jasoncameron.dev). I love the idea of making things and learning but I get so impatient with myself for not knowing how to do certain things, for googling and/or using AI to tell me whats going on, and for -even after resorting to that- not being able to understand/ have something work. Ah such is coding. 

### 06/03/2026 | Giving it a shot
I really missed this. I took some of the code from AI and plugged it into my components. It worked. But I only vaguely understood how it worked, and I didn't get the satisfaction of making something myself. So I deleted most of it and typed up something from scratch regarding what I wanted with 'toggling' my name in the last post. Actually going through the documentation and some youtube tutorials admittedly took a LOT longer but is so much more satisfying. Right now, NOTHING works. I don't understand why. And it's hilarious.

### 04/03/2026 | Balancing having a job and learning... so I can have a job
I want to complete this website such that I have the means and experience to find a job in the tech field. Specifically developer field(?). However I have little time to learn these skills because of having a Job. I will try none-the-less.

Something that I've been exploring is the use of AI as a teacher. I use AI by prompting it to guide/teach me but I find that putting the time in to analyse the code it generates myself is a better way of teaching myself. Only problem, It's time consuming. 

With the little time I've had, I realised I _really_ should prioritise actual functionality rather than aesthetic. Well, even saying that, as of now the 'nickname to fullname' animation is the only thing I've worked on. welp :c

I'll try import my github and linkedin links along side working on this animation.

HOLD AWN, I got an idea! I want my name to be toggle-able, and for each time its toggled there's a little tid-bit that would comment my thoughts on either my full name or nickname! oh yeah!

Oh wait, prompting AI to help me with this animation made me import `framer-motion` when I don't think I really need it. AND there's a more updated version (apparently). I'll do more research but now I need to figure out how to get rid of packages.

### 02/03/2026 | Thinking of what I should add? 
I was contemplating how i should set up my profile. I was thinking it _should_ include the following:
* Links to my github, linkedin, download resume, and contact.
* experience / projects section
* page (or section) for each project, with list of technologies used

and it _could_ include:
* More about me/blog
* photos of myself (with animations)
* cheeky animations
* A CMS for blog posts and project updates

I've got inspiration from this [Anthony Sistilli Video](https://youtu.be/4xqNp6IVXPM)! 

And so what I ended up working on first was an animation of my name. LE SIGH
### 28/02/2026 | Starting this profile 
This is all to up for change but I wanted to log my crude thoughts whenever I worked on this profile. I really wanted to start this personal website as a way to get some experience in, actually making something. I lack anything I'm really proud of showing off on my resume so I wanted to start with something simple, like this. I've been reviewing some other dev website/profile on youtube and am also consulting AI to teach me how to make what I want for myself. I have settled on making things simple and understandable because that seems to be whats the most hirable, however that's only really the case when I have projects to show off. Therefore, I had a bit of inner turmoil when it came to either making this website first or working on another project SO I could make the website AND show something off. Eventually settling on making this website, I am now just thinking about what I should have in it. 

The first thing I did change after making this with Next.js was the home page, replacing it with a simple greeting and description of myself. AI helped me with using tailwindCSS (which I feel like I should learn more of on my own), and now I just want to get rid of the assets that aren't being used, like the several `.svg` files that come with first making the page in Next.js. 
