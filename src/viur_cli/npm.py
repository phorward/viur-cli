import click, os, shutil
from . import cli, echo_error, get_config
from typing import List, Union

@cli.command(context_settings={"ignore_unknown_options": True})
@click.argument("name", default='develop')
@click.argument("additional_args", nargs=-1)
def npm(name: str, additional_args: List[Union[str, int, float]]):
    """create a release build"""
    projectConfig = get_config()

    if name not in projectConfig:
        echo_error(f"{name} is not a valid config name.")
        return

    conf = projectConfig["default"].copy()
    conf.update(projectConfig[name])


    if additional_args:
        script = additional_args[0]
    else:
        script = "build"

    # start sources build
    os.system(f'cd {conf["sources_folder"]} && npm run {script}')

