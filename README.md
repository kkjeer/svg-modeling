# SVG Modeling

Tool to create poseable svg characters. Low-level utilities such as `Path` and `Tube`, and `filters` are used to create classes such as `Face`, `Arm`, `Leg`, etc. These classes can be extended to create a variety of characters. Each class adjusts its underlying svg paths based on an input `Rig`, so that characters can have different poses.

Example characters:

![](https://user-images.githubusercontent.com/6687333/229985798-ee2684be-e469-4f72-8e90-474ea71d6068.png)

![](https://user-images.githubusercontent.com/6687333/229985808-b85ac2f9-7450-4586-8e90-4527df340a9f.png)

![](https://user-images.githubusercontent.com/6687333/229986330-58485f72-ec4d-4e7a-af98-9170f3ee4cef.png)

The `Path` and `filter` utilities can be also be used to handcraft static (non-poseable) characters. Some examples created with a prior version of this tool:

![](https://user-images.githubusercontent.com/6687333/229986531-6cb2aa0b-c5b1-4e9b-a834-6aea74c80682.jpg)
![](https://user-images.githubusercontent.com/6687333/229986541-3b2ab22c-1a32-43b9-8ed1-5cfbbcb88c0f.jpg)
