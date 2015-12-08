# How to install Python on Windows

## Install Python itself

Download the latest version of Python 2.7 (*not* Python 3) for 64-bit Windows [here](https://www.python.org/downloads/). *Make sure it's the x86-64 version!*

Just install it to C:\Python27. (You can pick somewhere else, you'll just have to adjust the paths in this guide.)

Add this to your PATH environment variable using the super-arcane Windows settings:

    C:\Python27\;C:\Python27\Scripts\

You may need to rebooting or log in again before this sticks.

Now you should be able to open a command line window and type

    python --version

and

    pip --version

and get reasonable answers and not "command not found" or whatever.

## Install core Python tools

Because we have Python 2.7.9 or higher, we already have pip. Now all we need is virtualenv.

Install virtualenv using pip:

    pip install virtualenv

## Create a virtual environment

We want to separate the packages needed for projects from other Python stuff, so we use virtualenv, which creates and manages virtual Python environments.

Create a virtual environment using:

    virtualenv C:\python_venvs\procjam15

It's good to have a place to put virtual environments. In this case we're assuming they're in C:\python_venvs\, but feel free to change that. The environment name is not really important, just pick something that's easy to type and indicate of what you'll be using it for.

Now activate the virtual environment by running:

    C:\python_venvs\procjam15\Scripts\activate.bat

The command line prompt should change to reflect the active virtual environment.

Never forget to activate the virtual environment, otherwise the project won't work!

## Setting up a virtual environment

In a command line window, go to the root of the project, where there is a file called requirements.txt. Then enter:

    pip install -r requirements.txt

This should install all the packages the project needs into the virtual environment.

You may need to do this again if requirements.txt changes.

## Running the project

Type:

    python run_dev_server.py

to run a local server that runs the game. Then go to http://127.0.0.1:5000/ in your browser to see the game running.

The local server will detect changes to files and will then automatically restart, which is handy. But it won't detect new files! For that you will have to exit using Ctrl + C and restart manually.

## How to install 64 bit binaries

If everything went fine so far, ignore this!

Some Python packages are partially written in C. We want to avoid having to build any C code because it's tricky to set up. So we're going to download pre-built binaries for 64-bit Windows.

Open http://www.lfd.uci.edu/~gohlke/pythonlibs/ and download the latest installers (for amd64 and Python 2.7) for any packages you might need.