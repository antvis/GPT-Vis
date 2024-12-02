from pathlib import Path

from shutil import rmtree
import os
import sys
import setuptools

# Load the package's _version.py module as a dictionary.
here = os.path.abspath(os.path.dirname(__file__))

__title__ = "streamlit-gpt-vis"
__version__ = "0.0.3"

this_directory = Path(__file__).parent
long_description = (this_directory / "README.md").read_text()

class UploadCommand(setuptools.Command):
    description = "Build and publish the package."
    user_options = []

    @staticmethod
    def status(s):
        print("✨✨ {0}".format(s))

    def initialize_options(self):
        pass

    def finalize_options(self):
        pass

    def run(self):
        try:
            self.status("Removing previous builds…")
            rmtree(os.path.join(here, "dist"))
            rmtree(os.path.join(here, "build"))
            rmtree(os.path.join(here, "{0}.egg-info".format(__title__)))
        except OSError:
            pass

        self.status("Building Source and Wheel distribution…")
        os.system("{0} setup.py bdist_wheel sdist".format(sys.executable))

        self.status("Uploading the package to PyPI via Twine…")
        os.system("python -m twine upload dist/*")

        sys.exit()

setuptools.setup(
    name=__title__,
    version=__version__,
    author="@lvisei",
    author_email="yunji.me@outlook.com",
    description="Binding for GPT-Vis, Components for GPTs, generative AI, and LLM projects. Not only UI Components.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/antvis/GPT-Vis/bindings/streamlit-gpt-vis",
    license="MIT",
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.7",
    install_requires=[
        # By definition, a Custom Component depends on Streamlit.
        # If your component has other Python dependencies, list
        # them here.
        "streamlit >= 0.63",
    ],
    __keywords__ = ["AntV", "GPTs", "Vis",
                "visualization", "map", "geospatial", "plot", "Graph", "LLM"],
    cmdclass={"upload": UploadCommand},
)
