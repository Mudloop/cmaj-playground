import { generateUniqueId } from "../util";
import { Volume, VirtualFS } from "../util/VirtualFS";
import { Project } from "./Project";
import { ProjectTemplate, ProjectSource, LibrarianOptions, ProjectInfo, ProjectSourceInfo, SourceFile, Builder } from "./Types";
const vfs = new VirtualFS('CmajPlayground');
const volume = await vfs.createVolume('main', {});
export class Librarian {
	public vfs = vfs;
	private templates: Record<string, ProjectTemplate>;
	private sources: Record<string, ProjectSource>;
	public builders: Record<string, Builder>;
	public volume: Volume;
	constructor(options: LibrarianOptions) {
		this.templates = options.templates ?? {};
		this.sources = options.sources ?? {};
		this.builders = options.builders ?? {};
		this.volume = volume;
	}
	listProjects = async (): Promise<ProjectInfo[]> => (await vfs.getVolumes()).filter(volume => volume.meta.isProject).map(volume => {
		return { id: volume.id, name: volume.meta.name, source: volume.meta.source, modified: volume.meta.modified };
	});
	getProjectInfo = async (id: string | undefined) => (await this.listProjects()).find(p => p.id == id)
	get lastOpenedProject() { return localStorage.getItem('lastOpenedProject') ?? undefined }
	set lastOpenedProject(id: string | undefined) { id ? localStorage.setItem('lastOpenedProject', id) : localStorage.removeItem('lastOpenedProject'); }
	get lastProjectNumber() { return parseInt(localStorage.getItem('lastProjectNumber') ?? '0') }
	set lastProjectNumber(id: number) { localStorage.setItem('lastProjectNumber', id.toString()) }
	openProject = async (id?: string) => {
		id ??= this.lastOpenedProject;
		console.log(id);
		const info = await this.getProjectInfo(id) ?? await this.createProject();
		if (!info) throw new Error('Failed to open project');
		const projectVolume = await vfs.getVolume(info.id);
		this.lastOpenedProject = info.id;
		return new Project(info, projectVolume, this);
	}
	createProject = async (name?: string, files?: string | SourceFile[], source?: ProjectSourceInfo) => {
		name ??= await this.generateProjectName();
		files = !files || typeof files == 'string' ? await this.templates[files ?? 'default']?.(name) : files ?? [];
		const id = generateUniqueId();
		const projectVolume = await vfs.createVolume(id, { name, source, isProject: true });
		files.forEach(file => file.type == 'dir' ? projectVolume.mkdir(file.path) : projectVolume.writeFile(file.path, file.content!));
		return await this.getProjectInfo(id);

	}
	generateProjectName = async () => `Untitled ${++this.lastProjectNumber}`

	importProject = async (identifier: string) => {
		const projects = await this.listProjects();
		const sourceEntry = Object.entries(this.sources).find(([_, source]) => source.test(identifier));
		if (!sourceEntry) throw new Error("Source not found");
		const [type, source] = sourceEntry;
		const current = projects.find(p => p.source?.type == type && p.source.identifier == identifier);
		if (current) return current;
		const { name, files, meta } = await source.import(identifier);
		return await this.createProject(name, files, { type, identifier, meta });
	}
	async deleteProject(id: string) {
		await vfs.deleteVolume(id);
		const projects = (await this.listProjects()).filter(project => project.id != id);
		this.lastOpenedProject = this.lastOpenedProject == id ? projects[0]?.id ?? undefined : this.lastOpenedProject;
	}


}
